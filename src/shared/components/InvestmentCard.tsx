"use client";

import React from "react";

interface InvestmentCardProps {
    assetIconUrl: string;
    assetName: string;
    assetTicker: string;
    quantity: number;
    purchasePrice: number;
    onRemove?: () => void;
}

export default function InvestmentCard({
                                                           assetIconUrl,
                                                           assetName,
                                                           assetTicker,
                                                           quantity,
                                                           purchasePrice,
                                                           onRemove,
                                                       }: InvestmentCardProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-mainGreen-100 rounded-lg shadow">
            <div className="flex items-center">
                <img
                    src={assetIconUrl}
                    alt={assetName}
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <p className="font-bold">{assetTicker}</p>
                    <p className="text-sm text-gray-600">{assetName}</p>
                </div>
            </div>
            <div>
                <p className="text-sm">Quantity: {quantity}</p>
                <p className="text-sm">Price: ${purchasePrice}</p>
            </div>
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:underline"
                >
                    Remove
                </button>
            )}
        </div>
    );
};
