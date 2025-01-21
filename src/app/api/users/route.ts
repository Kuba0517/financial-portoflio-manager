import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { UserResponseDTO } from "@/dtos/user.dto";

export async function GET(req: NextRequest) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    try {
        if (email) {
            const user = await User.findOne({ email }).select("-password");
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const userDTO: UserResponseDTO = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                description: user.description,
                createdAt: user.createdAt.toISOString(),
            };

            return NextResponse.json(userDTO, { status: 200 });
        } else {
            const users = await User.find().select("-password");
            const usersDTO: UserResponseDTO[] = users.map((u) => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                role: u.role,
                description: u.description,
                createdAt: u.createdAt.toISOString(),
            }));

            return NextResponse.json(usersDTO, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    await connectToDatabase();
    const body = await req.json();

    try {
        const newUser = await User.create(body);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 400 });
    }
}
