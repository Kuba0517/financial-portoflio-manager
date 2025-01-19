import connectToDatabase from '@/lib/mongodb';
import UserPortfolioRating from '@/models/UserPortfolioRating';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();

    try {
        const rating = await UserPortfolioRating.findById(params.id);

        if (!rating) {
            return new Response(
                JSON.stringify({ error: "Rating not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(JSON.stringify(rating), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching user portfolio rating:", error);

            return new Response(
                JSON.stringify({error: "Failed to fetch rating", details: error.message}),
                {status: 400, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();

    try {
        const data = await req.json();

        const updatedRating = await UserPortfolioRating.findByIdAndUpdate(params.id, data, { new: true });

        if (!updatedRating) {
            return new Response(
                JSON.stringify({ error: "Rating not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(JSON.stringify(updatedRating), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error updating user portfolio rating:", error);

            return new Response(
                JSON.stringify({error: "Failed to update rating", details: error.message}),
                {status: 400, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();

    try {
        const deletedRating = await UserPortfolioRating.findByIdAndDelete(params.id);

        if (!deletedRating) {
            return new Response(
                JSON.stringify({ error: "Rating not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Rating deleted successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error deleting user portfolio rating:", error);

            return new Response(
                JSON.stringify({error: "Failed to delete rating", details: error.message}),
                {status: 400, headers: {"Content-Type": "application/json"}}
            );
        }
    }
}