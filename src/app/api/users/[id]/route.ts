import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req: Request) {
    await connectToDatabase();
    const { id, ...data } = await req.json();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return Response.json(user);
}

export async function DELETE(req: Request) {
    await connectToDatabase();
    const { id } = await req.json();
    await User.findByIdAndDelete(id);
    return Response.json({ message: 'User deleted successfully' });
}