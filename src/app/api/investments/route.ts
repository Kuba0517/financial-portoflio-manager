import connectToDatabase from '@/lib/mongodb';
import Investment from "@/models/Investment";

export async function GET() {
    await connectToDatabase();
    const investments = await Investment.find();
    return Response.json(investments);
}

export async function POST(req: Request) {
    await connectToDatabase();
    const data = await req.json();
    const investment = await Investment.create(data);
    return Response.json(investment, { status: 201 });
}
