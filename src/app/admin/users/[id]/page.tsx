"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "@/app/admin/users/components/UserForm";
import { UserResponseDTO } from "@/dtos/user.dto";
import apiClient from "@/lib/apiClient";

export default function UserDetailPage() {
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [error, setError] = useState("");
    const router = useRouter();
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await apiClient.get(`/api/users/${userId}`);
                setUser(data);
            } catch (err: any) {
                setError("Failed to fetch user data");
                console.error(err);
            }
        };
        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleSave = async (updated: Partial<UserResponseDTO>) => {
        try {
            const { data } = await apiClient.put(`/api/users/${userId}`, updated);
            alert("User updated!");
            setUser(data);
        } catch (err) {
            console.error(err);
            alert("Failed to update user");
        }
    };

    if (error) return <p className="text-red-600">{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className={"max-w-screen-xl m-auto"}>
            <h1 className="text-2xl font-bold">Edit User</h1>
            <UserForm user={user} onSave={handleSave} />
        </div>
    );
}
