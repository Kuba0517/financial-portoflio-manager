import connectToDatabase from "@/lib/mongodb";
import Investment from "@/models/Investment";

export async function PUT(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    const data = await req.json();
    const investment = await Investment.findByIdAndUpdate(id, data, { new: true });
    return Response.json(investment);
}

export async function DELETE(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    await Investment.findByIdAndDelete(id);
    return Response.json({ message: 'User deleted successfully' });
}

export async function GET(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    const investment = await Investment.findById(id);
    return Response.json(investment);
}