"use client";

import React, { useState } from "react";
import { UserResponseDTO } from "@/dtos/user.dto";
import apiClient from "@/lib/apiClient";
import Button from "@/shared/components/Button";

interface UserInfoProps {
    user: UserResponseDTO;
}

export default function UserInfo({ user }: UserInfoProps) {
    const [currentUser, setCurrentUser] = useState<UserResponseDTO>(user);

    const [name, setName] = useState(currentUser.name ?? "");
    const [description, setDescription] = useState(currentUser.description ?? "");

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (!currentUser) {
        return null;
    }

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);

        if (isEditing) {
            setName(currentUser.name);
            setDescription(currentUser.description);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await apiClient.put(`/api/users/${currentUser.id}`, {
                name,
                description,
            });

            if (response.status === 200) {
                const updatedUser = response.data;
                alert("profile updated");

                setCurrentUser(updatedUser);

                setName(updatedUser.name);
                setDescription(updatedUser.description);

                setIsEditing(false);
            } else {
                alert("something wrong");
            }
        } catch (error) {
            console.error("error updating user", error);
            alert("error updating profile");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="border p-6 rounded-xl shadow-md bg-white flex space-x-4">
            <div className="w-16 h-16 flex items-center justify-center bg-mainGreen-300 text-white text-2xl font-bold rounded-full">
                {currentUser.name?.[0]?.toUpperCase()}
            </div>

            <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Profile Details</h2>

                {isEditing ? (
                    <div className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium">Name:</label>
                            <input
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Description:</label>
                            <textarea
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <Button
                                label={isSaving ? "Saving..." : "Save"}
                                onClick={handleSave}
                                disabled={isSaving}
                            />
                            <Button
                                label="Cancel"
                                onClick={handleEditToggle}
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-mainGreen-800">
                            <strong>Name:</strong> {currentUser.name}
                        </p>
                        <p>
                            <strong>Description:</strong> {currentUser.description}
                        </p>

                        <div className="mt-4">
                            <Button
                                label="Edit"
                                onClick={handleEditToggle}
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
