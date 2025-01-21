"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";
import SearchAssets from "@/shared/components/Search/SearchAssets";
import apiClient from "@/lib/apiClient";
import InvestmentCard from "@/shared/components/InvestmentCard";
import { IoMdClose } from "react-icons/io";
import { Session } from "next-auth";

interface Investment {
    assetId: string;
    assetName: string;
    assetTicker: string;
    assetIconUrl: string;
    quantity: number;
    purchasePrice: number;
}

interface NewPortfolioModalProps {
    onClose: () => void;
    portfolio?: { id: string; name: string; investments: Investment[] };
    session: Session;
    onChange?: () => void;
}
``
export default function NewPortfolioModal({
                                              onClose,
                                              portfolio,
                                              session
                                          }: NewPortfolioModalProps) {
    const [portfolioName, setPortfolioName] = useState(portfolio?.name || "");
    const [investments, setInvestments] = useState<Investment[]>(
        portfolio?.investments || []
    );
    const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
    const [quantity, setQuantity] = useState<number | string>("");
    const [purchasePrice, setPurchasePrice] = useState<number | string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAssetSelect = (asset: any) => {
        setSelectedAsset(asset);
    };

    const handleAddInvestment = () => {
        if (!selectedAsset || !quantity || !purchasePrice) return;

        setInvestments((prev) => [
            ...prev,
            {
                assetId: selectedAsset.id,
                assetName: selectedAsset.name,
                assetTicker: selectedAsset.symbol,
                assetIconUrl: selectedAsset.iconUrl,
                quantity: Number(quantity),
                purchasePrice: Number(purchasePrice),
            },
        ]);

        setSelectedAsset(null);
        setQuantity("");
        setPurchasePrice("");
    };

    const handleRemoveInvestment = (index: number) => {
        setInvestments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!portfolioName || investments.length === 0) return;

        setIsSubmitting(true);
        try {
            const payload = {
                userId: session?.user?.id,
                name: portfolioName,
                investments,
            };

            if (portfolio?.id) {
                const response = await apiClient.put(
                    `/api/portfolios/${portfolio.id}`,
                    payload
                );
                if (response.status === 200) {
                    alert("Portfolio updated");
                    onClose();
                }
            } else {
                const response = await apiClient.post("/api/portfolios", payload);
                if (response.status === 201) {
                    alert("Portfolio created");
                    onClose();
                }
            }
        } catch (error) {
            console.error("Error creating/updating portfolio:", error);
            alert("Failed to save");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                        {portfolio ? "Edit Portfolio" : "New Portfolio"}
                    </h2>
                    <IoMdClose className="cursor-pointer w-6 h-6" onClick={onClose} />
                </div>

                <div className="mb-4">
                    <label htmlFor="portfolioName" className="block text-sm font-medium">
                        Portfolio Name
                    </label>
                    <input
                        id="portfolioName"
                        type="text"
                        value={portfolioName}
                        onChange={(e) => setPortfolioName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <SearchAssets onAssetSelect={handleAssetSelect} />
                </div>

                {selectedAsset && (
                    <div className="mb-4 flex items-center space-x-4 p-4 bg-mainGreen-200 rounded-lg">
                        <img
                            src={selectedAsset.iconUrl}
                            alt={selectedAsset.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="font-bold text-lg">{selectedAsset.name}</p>
                            <p className="text-sm text-gray-600">{selectedAsset.symbol}</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 mb-4">
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="purchasePrice"
                            className="block text-sm font-medium"
                        >
                            Purchase Price
                        </label>
                        <input
                            id="purchasePrice"
                            type="number"
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                </div>

                <Button label="Add Investment" onClick={handleAddInvestment} />
                <ul className="mt-4 space-y-2">
                    {investments.map((inv, index) => (
                        <InvestmentCard
                            key={index}
                            assetIconUrl={inv.assetIconUrl}
                            assetName={inv.assetName}
                            assetTicker={inv.assetTicker}
                            quantity={inv.quantity}
                            purchasePrice={inv.purchasePrice}
                            onRemove={() => handleRemoveInvestment(index)}
                        />
                    ))}
                </ul>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button
                        label="Cancel"
                        onClick={onClose}
                        className="bg-gray-500"
                        disabled={isSubmitting}
                    />
                    <Button
                        label={isSubmitting ? "Submitting..." : "Submit"}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}
