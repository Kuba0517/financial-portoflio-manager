"use client";

import { FaStar, FaRegStar } from "react-icons/fa";

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
}

interface PortfolioReviewsProps {
    reviews: Review[];
}

export default function PortfolioReviews({ reviews }: PortfolioReviewsProps) {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li
                            key={review.id}
                            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm text-gray-600">
                                    {review.userName || "Anonymous"}
                                </div>
                                <div className="flex items-center">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            <p className="text-gray-800">{review.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
