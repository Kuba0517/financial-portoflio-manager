import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserPortfolioRating from "@/models/UserPortfolioRating";
import Portfolio from "@/models/Portfolio";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { portfolioId, rating, comment, userId } = body;

        console.log(portfolioId + " " + rating + " " + comment + " " + userId);

        if (!portfolioId) {
            return NextResponse.json({ error: "portfolioId is required" }, { status: 400 });
        }
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
        }
        if (!comment?.trim()) {
            return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
        }

        const portfolioExists = await Portfolio.exists({ _id: portfolioId });
        if (!portfolioExists) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        const newRating = await UserPortfolioRating.create({
            portfolioId,
            userId,
            rating,
            comment
        });

        const populatedRating = await newRating.populate({
            path: "userId",
            select: "name"
        })

        return NextResponse.json(
            {
                review: {
                    id: populatedRating._id,
                    portfolioId: populatedRating.portfolioId,
                    userId: populatedRating.userId._id,
                    userName: populatedRating.userId.name,
                    rating: populatedRating.rating,
                    comment: populatedRating.comment,
                    createdAt: populatedRating.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const portfolioId = searchParams.get("portfolioId");

        const filter: any = {};
        if (portfolioId) {
            filter.portfolioId = portfolioId;
        }

        const ratings = await UserPortfolioRating.find(filter);

        return NextResponse.json({ reviews: ratings }, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
