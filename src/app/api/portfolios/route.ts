import connectToDatabase from '@/lib/mongodb';
import Portfolio from "@/models/Portfolio";
import {PortfolioResponseDTO} from "@/dtos/portfolio.dto";

export async function GET() {
    await connectToDatabase();
    const portfolios = await Portfolio.find().populate('user', 'name email');

    console.log(portfolios);

    const response: PortfolioResponseDTO[] = portfolios.map((portfolio) => ({
        id: portfolio._id.toString(),
        name: portfolio.name,
        createdAt: portfolio.createdAt,
        user: portfolio.user ? {
            id: portfolio.user._id.toString(),
            name: portfolio.user.name,
            email: portfolio.user.email,
        } : null
    }))

    return Response.json(response);
}

export async function POST(req: Request) {
    await connectToDatabase();
    const data: PortfolioResponseDTO = await req.json();
    const portfolio = await Portfolio.create(data);
    return Response.json(portfolio, { status: 201 });
}
