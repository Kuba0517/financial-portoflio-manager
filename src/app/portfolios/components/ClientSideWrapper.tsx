"use client";

import React, { useState } from "react";
import PortfolioInvestments from "@/app/portfolios/components/PortfolioInvestments";
import PortfolioReviewsWrapper from "@/app/portfolios/components/PortfolioReviewsWrapper";
import Button from "@/shared/components/Button";
import NewPortfolioModal from "@/shared/components/PortfolioModal";
import apiClient from "@/lib/apiClient";
import { FaBrain } from "react-icons/fa";
import Loader from "@/shared/components/Loader";

export default function ClientSideWrapper({ session, portfolioData, canEdit, assetsArray, isOwner }: any) {
    const [showModal, setShowModal] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateAnalysis = async () => {
        const prompt = `I need a short analysis of this: ${portfolioData?.name} portfolio. 
        This is what portfolio includes: ${JSON.stringify(portfolioData?.investments)}.
        Give each of the stocks price prediction for 2025-2030 and quickly say why.
        + format the response in valid HTML, using headings, bullet points, or tables.`


        try {
            setIsGenerating(true);
            const response = await apiClient.post("/api/generateAnalysis", { prompt });

            if (response.status === 200) {
                const data = response.data;
                setAnalysisResult(data?.answer || "No response from AI");
            } else {
                throw new Error(`error during analysis ${response.status}`);
            }
        } catch (err) {
            console.error("handleGenerateAnalysis error:", err);
            setAnalysisResult("Error");
        } finally {
            setIsGenerating(false);
        }
    };

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

            {assetsArray.length > 0 &&
            <section className="mb-10">
                <Button
                    label="Generate AI analysis"
                    onClick={handleGenerateAnalysis}
                    disabled={isGenerating}
                    icon={<FaBrain/>}
                />

                {isGenerating && <Loader />}

                {analysisResult && (
                    <div className="mt-4 p-2 border rounded bg-gray-50">
                        <p className="font-bold mb-2">AI conclusion:</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: analysisResult }}
                        />
                    </div>
                )}
            </section>
            }

            {session && (
                <section>
                    <PortfolioReviewsWrapper
                        portfolioId={portfolioData.id}
                        initialReviews={portfolioData.userRatings || []}
                        canAddReview={!isOwner}
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
