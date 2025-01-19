import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import Investment from "@/models/Investment";
import UserPortfolioRating from "@/models/UserPortfolioRating";
import {PortfolioDTO} from "@/dtos/portfolio.dto";
import Asset from "@/models/Asset";
import User from "@/models/User";


async function mapToPortfolioDTO(portfolioId: string): Promise<PortfolioDTO | null> {
    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) return null;

    const investments = await Investment.find({ portfolioId });
    const assetIds = investments.map((inv) => inv.assetId);
    const assets = await Asset.find({ _id: { $in: assetIds } });

    const userRatings = await UserPortfolioRating.find({ portfolioId });

    const userIds = userRatings.map((rating) => rating.userId);
    const users = await User.find({ _id: { $in: userIds } });

    return {
        id: portfolio._id.toString(),
        name: portfolio.name,
        createdAt: portfolio.createdAt.toISOString(),
        investments: investments.map((inv) => {
            const asset = assets.find((a) => a._id.toString() === inv.assetId.toString());
            return {
                quantity: inv.quantity,
                purchasePrice: inv.purchasePrice,
                asset: {
                    id: asset?._id.toString() || '',
                    name: asset?.name || 'Unknown Asset',
                    symbol: asset?.symbol || '',
                    description: asset?.description || '',
                    iconUrl: asset?.iconUrl || '',
                    webUrl: asset?.webUrl || '',
                },
            };
        }),
        userRatings: userRatings.map((rating) => {
            const user = users.find((u) => u._id.toString() === rating.userId.toString());
            return {
                id: rating._id.toString(),
                userId: rating.userId.toString(),
                userName: user?.name || "Unknown User",
                rating: rating.rating,
                comment: rating.comment,
                createdAt: rating.createdAt.toISOString(),
            };
        }),
    };
}


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();

    const id = (await params).id;
    const data = await req.json();

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, data, { new: true });

    if (!updatedPortfolio) {
        return new Response(JSON.stringify({ error: "Portfolio not found" }), { status: 404 });
    }

    const portfolioDTO = await mapToPortfolioDTO(updatedPortfolio.id.toString());
    return new Response(JSON.stringify(portfolioDTO), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();

    const id = (await params).id;

    await Portfolio.findByIdAndDelete(id);
    await Investment.deleteMany({ portfolioId: id });
    await UserPortfolioRating.deleteMany({ portfolioId: id });

    return new Response(
        JSON.stringify({ message: "Portfolio deleted successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();

    const id = (await params).id;

    const portfolioDTO = await mapToPortfolioDTO(id);

    if (!portfolioDTO) {
        return new Response(JSON.stringify({ error: "Portfolio not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(portfolioDTO), { status: 200, headers: { "Content-Type": "application/json" } });
}