"use client";

import PortfolioInvestments from "@/app/portfolios/components/PortfolioInvestments";
import PortfolioReviewsWrapper from "@/app/portfolios/components/PortfolioReviewsWrapper";
import Button from "@/shared/components/Button";
import NewPortfolioModal from "@/shared/components/PortfolioModal";
import { useState } from "react";


import React from "react";

export default function ClientSideWrapper({ session, portfolioData, canEdit, assetsArray }: any) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-5">{portfolioData.name}</h1>

            {canEdit && (
                <div className="mb-4">
                    <Button label="Edit Portfolio" onClick={() => setShowModal(true)} />
                </div>
            )}

            <section className="mb-10">
                <h2 className="text-xl font-bold mb-3">Investments</h2>
                <PortfolioInvestments assets={assetsArray} />
            </section>

            {session && (
                <section>
                    <PortfolioReviewsWrapper
                        portfolioId={portfolioData.id}
                        initialReviews={portfolioData.userRatings || []}
                        canAddReview={portfolioData.user?.id !== session?.user?.id}
                        userId={session?.user?.id}
                    />
                </section>
            )}

            {showModal && (
                <NewPortfolioModal
                    onClose={() => setShowModal(false)}
                    portfolio={{
                        id: portfolioData.id,
                        name: portfolioData.name,
                        investments: portfolioData.investments.map((inv: any) => ({
                            assetId: inv.asset.id,
                            assetName: inv.asset.name,
                            assetTicker: inv.asset.symbol,
                            assetIconUrl: inv.asset.iconUrl,
                            quantity: inv.quantity,
                            purchasePrice: inv.purchasePrice,
                        })),
                    }}
                    session={session}
                />
            )}
        </div>
    );
}