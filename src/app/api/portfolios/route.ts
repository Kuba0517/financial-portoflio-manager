import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function GET(req: Request) {
    await connectToDatabase();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const userId = url.searchParams.get("userId");

    try {
        const filter = userId ? { user: userId } : {};

        const portfolios = await Portfolio.find(filter)
            .skip(skip)
            .limit(limit)
            .populate("user", "name email");

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
                page,
                limit,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching portfolios:", error);

            return new Response(
                JSON.stringify({error: "Failed to fetch portfolios", details: error.message}),
                {status: 500, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}

export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const { name, investments, userId } = await req.json();

        if (!name || !investments || !Array.isArray(investments) || !userId) {
            return new Response(
                JSON.stringify({ error: "Invalid request data" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Create a new portfolio document
        const newPortfolio = new Portfolio({
            name,
            investments,
            user: userId,
            createdAt: new Date(),
        });

        const savedPortfolio = await newPortfolio.save();

        return new Response(
            JSON.stringify({
                message: "Portfolio created successfully",
                portfolio: {
                    id: savedPortfolio._id.toString(),
                    name: savedPortfolio.name,
                    createdAt: savedPortfolio.createdAt,
                    user: savedPortfolio.user,
                },
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating portfolio:", error);

            return new Response(
                JSON.stringify({error: "Failed to create portfolio", details: error.message}),
                {status: 500, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}
