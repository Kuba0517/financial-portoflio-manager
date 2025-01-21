"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import apiClient from "@/lib/apiClient";
import Loader from "@/shared/components/Loader";

interface ReviewFormProps {
    portfolioId: string;
    onNewReview: (review: any) => void;
    userId: string;
}

export default function ReviewForm({ portfolioId, onNewReview, userId }: ReviewFormProps) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || rating === 0) {
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");

            const res = await apiClient.post(`/api/user-portfolio-rating`, {
                portfolioId,
                rating,
                comment,
                userId
            });

            onNewReview(res.data.review);

            setComment("");
            setRating(0);
        } catch (err) {
            console.error("Error adding review:", err);
            setError("Failed to add review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStarSelection = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    className="focus:outline-none"
                >
                    <FaStar className={i <= rating ? "text-yellow-500" : "text-gray-300"} />
                </button>
            );
        }
        return <div className="flex items-center space-x-1">{stars}</div>;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {error && <p className="text-red-500">{error}</p>}

            <div>
                <label className="mb-1 block text-sm font-medium">Your Rating:</label>
                {renderStarSelection()}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Comment:</label>
                <textarea
                    className="w-full border p-2 rounded"
                    rows={3}
                    placeholder="Add your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            {isSubmitting ? <Loader/> :
            <button
                type="submit"
                disabled={rating === 0 || !comment.trim()}
                className="px-3 py-1 bg-mainGreen-500 text-white rounded hover:bg-mainGreen-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            }
        </form>
    );
}
