import React from "react";
import { AssetSearchResponseDTO } from "@/dtos/asset.dto";

interface AssetListProps {
    assets: AssetSearchResponseDTO[];
    onClick: (asset: AssetSearchResponseDTO) => void;
    selectedAssetId: string | null; // Dodaj jako właściwość
}

const AssetList: React.FC<AssetListProps> = ({ assets, onClick, selectedAssetId }) => {
    if (assets.length === 0) {
        return <p className="text-center text-gray-500">No assets found.</p>;
    }

    return (
        <ul className="mt-4 bg-mainGreen-600 p-5 rounded-md max-h-[50vh] overflow-y-auto">
            {assets.map((asset) => (
                <li
                    key={asset.id}
                    onClick={() => onClick(asset)}
                    className={`cursor-pointer flex items-center p-4 bg-mainGreen-300 shadow mb-2 transition rounded-xl ${
                        selectedAssetId === asset.id ? "bg-mainGreen-400 ring-2 ring-mainGreen-700" : "hover:bg-mainGreen-400"
                    }`}
                >
                    {asset.iconUrl && (
                        <img
                            src={asset.iconUrl}
                            alt={`${asset.name} logo`}
                            className="w-12 h-12 object-contain mr-4 rounded-full"
                        />
                    )}
                    <div>
                        <div className="flex items-baseline">
                            <span className="text-xl font-bold text-mainGreen-500">{asset.symbol}</span>
                            <span className="ml-2 text-gray-700">{asset.name}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AssetList;
