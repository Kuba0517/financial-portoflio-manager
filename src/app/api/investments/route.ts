import connectToDatabase from '@/lib/mongodb';
import Investment from "@/models/Investment";
import Asset from "@/models/Asset";
import Portfolio from "@/models/Portfolio";

export async function GET() {
    await connectToDatabase();
    const investments = await Investment.find();
    return Response.json(investments);
}

export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const data = await req.json();

        const portfolioExists = await Portfolio.exists({ _id: data.portfolioId });
        if (!portfolioExists) {
            return new Response(
                JSON.stringify({ error: "Portfolio not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const assetExists = await Asset.exists({ _id: data.assetId });
        if (!assetExists) {
            return new Response(
                JSON.stringify({ error: "Asset not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const investment = await Investment.create(data);

        return new Response(JSON.stringify(investment), { status: 201, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error while creating an investment:", error);

            return new Response(
                JSON.stringify({error: "Failed to add investment", details: error.message}),
                {status: 400, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}
