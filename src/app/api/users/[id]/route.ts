import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    const data = await req.json();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return Response.json(user);
}

export async function DELETE(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    await User.findByIdAndDelete(id);
    return Response.json({ message: 'User deleted successfully' });
}

export async function GET(req: Request, { params }: { params: Promise<{id: string}>}) {
    await connectToDatabase();
    const id = (await params).id;
    const user = await User.findById(id);
    return Response.json(user);
}