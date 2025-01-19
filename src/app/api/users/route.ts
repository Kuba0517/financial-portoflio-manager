import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { UserResponseDTO } from '@/dtos/user.dto';

export async function GET(req: Request) {
    await connectToDatabase();

    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    try {
        if (email) {
            const user = await User.findOne({ email }).select("-password");

            if (!user) {
                return new Response(JSON.stringify({ error: "User not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }

            const userDTO: UserResponseDTO = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                description: user.description,
                createdAt: user.createdAt.toISOString(),
            };

            return new Response(JSON.stringify(userDTO), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            const users = await User.find().select("-password");

            const usersDTO: UserResponseDTO[] = users.map((user) => ({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                description: user.description,
                createdAt: user.createdAt.toISOString(),
            }));

            return new Response(JSON.stringify(usersDTO), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error fetching users:", error);

        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function POST(req: Request) {
    await connectToDatabase();
    const data = await req.json();
    const user = await User.create(data);
    return Response.json(user, { status: 201 });
}
