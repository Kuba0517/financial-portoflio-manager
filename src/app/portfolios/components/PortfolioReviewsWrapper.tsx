"use client";

import React, { useState } from "react";
import PortfolioReviews from "./PortfolioReviews";
import ReviewForm from "./ReviewForm";

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
}

interface PortfolioReviewsWrapperProps {
    portfolioId: string;
    initialReviews: Review[];
    canAddReview: boolean;
    userId: string;
}

export default function PortfolioReviewsWrapper({
                                                    portfolioId,
                                                    initialReviews,
                                                    canAddReview,
    userId
                                                }: PortfolioReviewsWrapperProps) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const handleNewReview = (newReview: Review) => {
        setReviews((prev) => [newReview, ...prev]);
    };

    return (
        <div>
            <PortfolioReviews reviews={reviews} />

            {canAddReview && (
                <div className="mt-4">
                    <ReviewForm
                        portfolioId={portfolioId}
                        onNewReview={handleNewReview}
                        userId={userId}
                    />
                </div>
            )}
        </div>
    );
}
