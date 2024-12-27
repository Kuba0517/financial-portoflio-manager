import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function PUT(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    const data = await req.json();
    const portfolio = await Portfolio.findByIdAndUpdate(id, data, { new: true });
    return Response.json(portfolio);
}

export async function DELETE(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    await Portfolio.findByIdAndDelete(id);
    return Response.json({ message: 'User deleted successfully' });
}

export async function GET(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    const user = await Portfolio.findById(id);
    return Response.json(user);
}