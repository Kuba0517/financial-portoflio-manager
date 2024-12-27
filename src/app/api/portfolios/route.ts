import connectToDatabase from '@/lib/mongodb';
import Portfolio from "@/models/Portfolio";

export async function GET() {
    await connectToDatabase();
    const portfolios = await Portfolio.find().populate('user', 'name email');
    return Response.json(portfolios);
}

export async function POST(req: Request) {
    await connectToDatabase();
    const data = await req.json();
    const portfolio = await Portfolio.create(data);
    return Response.json(portfolio, { status: 201 });
}
