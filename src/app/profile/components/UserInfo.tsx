"use client";

import { UserResponseDTO } from "@/dtos/user.dto";

interface UserInfoProps {
    user: UserResponseDTO;
}

function UserInfo({ user }: UserInfoProps) {
    if (!user) {
        return
    }

    return (
        <div className="border p-6 rounded-xl shadow-md bg-white flex space-x-4">
            <div className="w-16 h-16 flex items-center justify-center bg-mainGreen-300 text-white text-2xl font-bold rounded-full">
                {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
                <h2 className="text-xl font-bold mb-2">Profile Details</h2>
                <p className="text-mainGreen-800"><strong>Name:</strong> {user.name}</p>
                <p><strong>Description:</strong> {user.description}</p>
            </div>
        </div>
    );
}

export default UserInfo;
