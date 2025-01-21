"use client";

import React, { useState, useEffect } from "react";
import UsersList from "@/app/admin/users/components/UsersList";
import { UserResponseDTO } from "@/dtos/user.dto";
import apiClient from "@/lib/apiClient"; // e.g. axios

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserResponseDTO[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await apiClient.get("/api/users");
                setUsers(data);
            } catch (err: any) {
                setError("Failed to fetch users");
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await apiClient.delete(`/api/users/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete user");
        }
    };

    return (
        <div className={"max-w-screen-xl m-auto"}>
            <h1 className="text-2xl font-bold">Admin: Manage Users</h1>
            {error && <p className="text-red-600">{error}</p>}
            <UsersList users={users} onDelete={handleDelete} />
        </div>
    );
}
