import bcrypt from "bcrypt";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
import {UserRole} from "@/types/UserRoles";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const {name, email, password} = await req.json();

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return Response.json({error: "User already exists"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: UserRole.USER
        });

        return Response.json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        }, {status: 201});
    } catch (error){
        console.log(error);
        return Response.json({error: "Error occurred during registration process"}, {status: 500});
    }
}