"use client";

import React, { useState } from "react";
import { UserResponseDTO } from "@/dtos/user.dto";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

interface UserFormProps {
    user: UserResponseDTO;
    onSave: (values: Partial<UserResponseDTO>) => void;
}

export default function UserForm({ user, onSave }: UserFormProps) {
    const [name, setName] = useState(user.name || "");
    const [role, setRole] = useState(user.role || "USER");
    const [description, setDescription] = useState(user.description || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, role, description });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 rounded shadow-md"
        >
            <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Name:
                </label>
                <Input
                    label={"Username"}
                    type="text"
                    value={name}
                    placeholder="Enter user name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Role:
                </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded border p-2 focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="user">USER</option>
                    <option value="administrator">ADMIN</option>
                    <option value="moderator">MODERATOR</option>
                </select>
            </div>

            <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Description:
                </label>
                <textarea
                    value={description}
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border p-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Write a short description"
                />
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    label="Save"
                    className="bg-mainGreen-500 text-white hover:bg-mainGreen-600"
                />
            </div>
        </form>
    );
}
