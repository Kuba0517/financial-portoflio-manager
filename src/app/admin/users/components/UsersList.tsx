"use client";

import React from "react";
import { UserResponseDTO } from "@/dtos/user.dto";
import Link from "next/link";

interface UsersListProps {
    users: UserResponseDTO[];
    onDelete: (id: string) => void;
}

export default function UsersList({ users, onDelete }: UsersListProps) {
    if (!users?.length) {
        return <p className="text-gray-500">No users found</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b border-gray-200 bg-gray-100">
                    <th className="p-3 font-semibold text-gray-700">Name</th>
                    <th className="p-3 font-semibold text-gray-700">Email</th>
                    <th className="p-3 font-semibold text-gray-700">Role</th>
                    <th className="p-3 font-semibold text-gray-700">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="border-b last:border-none transition-colors hover:bg-gray-50"
                    >
                        <td className="p-3">
                            <span className="font-semibold text-gray-800">{user.name}</span>
                        </td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3 capitalize">{user.role}</td>
                        <td className="p-3">
                            <Link
                                href={`/admin/users/${user.id}`}
                                className="inline-block rounded bg-mainGreen-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-mainGreen-600 mr-2"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => onDelete(user.id)}
                                className="inline-block rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
