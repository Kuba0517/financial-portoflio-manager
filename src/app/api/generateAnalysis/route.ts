import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
        });

        const answer = completion.choices?.[0]?.message?.content || "No data from OpenAI api"

        return NextResponse.json({ answer });
    } catch (error) {
        if(error instanceof Error) {
            return new NextResponse("Server error", { status: 500 });
        }
    }
}
