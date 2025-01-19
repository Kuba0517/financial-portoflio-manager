import connectToDatabase from '@/lib/mongodb';
import UserPortfolioRating from '@/models/UserPortfolioRating';
import Portfolio from "@/models/Portfolio";

export async function GET() {
    await connectToDatabase();

    const ratings = await UserPortfolioRating.find();

    return new Response(JSON.stringify(ratings), {
        status: 200,
        headers: {"Content-Type": "application/json"},
    });
}

export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const data = await req.json();

        const portfolioExists = await Portfolio.exists({_id: data.portfolioId});
        if (!portfolioExists) {
            return new Response(
                JSON.stringify({error: "Portfolio not found"}),
                {status: 404, headers: {"Content-Type": "application/json"}}
            );
        }

        const rating = await UserPortfolioRating.create(data);

        return new Response(JSON.stringify(rating), {status: 201, headers: {"Content-Type": "application/json"}});
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating user portfolio rating:", error);

            return new Response(
                JSON.stringify({error: "Failed to create rating", details: error.message}),
                {status: 400, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}