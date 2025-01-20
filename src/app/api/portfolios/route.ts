import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import Investment from "@/models/Investment";

export async function GET(req: Request) {
    await connectToDatabase();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const userId = url.searchParams.get("userId");

    try {
        const filter = userId ? { user: userId } : {};

        let query = Portfolio.find(filter).populate("user", "name email");

        if (!userId) {
            query = query.skip(skip).limit(limit);
        }

        const portfolios = await query;
        const total = await Portfolio.countDocuments(filter);

        const formattedPortfolios = portfolios.map((portfolio) => ({
            id: portfolio._id.toString(),
            name: portfolio.name,
            createdAt: portfolio.createdAt,
            user: portfolio.user
                ? {
                    id: portfolio.user._id.toString(),
                    name: portfolio.user.name,
                    email: portfolio.user.email,
                }
                : null,
        }));

        return new Response(
            JSON.stringify({
                portfolios: formattedPortfolios,
                total,
                page: userId ? 1 : page,
                limit: userId ? portfolios.length : limit,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching portfolios:", error);

            return new Response(
                JSON.stringify({ error: "Failed to fetch portfolios", details: error.message }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    }
}

export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const { name, investments, userId } = await req.json();

        if (!name || !Array.isArray(investments) || investments.length === 0 || !userId) {
            return new Response(
                JSON.stringify({ error: "Invalid request data" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const portfolio = await Portfolio.create({ name, user: userId });

        const investmentPromises = investments.map((investment: any) =>
            Investment.create({
                portfolioId: portfolio._id,
                assetId: investment.assetId,
                quantity: investment.quantity,
                purchasePrice: investment.purchasePrice,
            })
        );

        await Promise.all(investmentPromises);

        return new Response(
            JSON.stringify({
                message: "Portfolio and investments created successfully",
                portfolioId: portfolio._id.toString(),
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error creating portfolio and investments:", error);

        return new Response(
            JSON.stringify({ error: "Failed to create portfolio", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}