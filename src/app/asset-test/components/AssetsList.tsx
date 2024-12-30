import React from 'react';
import {AssetSearchResponseDTO} from "@/dtos/asset.dto";

interface AssetListProps {
    assets: AssetSearchResponseDTO[];
}

const AssetList: React.FC<AssetListProps> = ({ assets }) => {
    if (assets.length === 0) {
        return <p className="text-center text-gray-500">No assets found.</p>;
    }

    return (
        <ul className="mt-4">
            {assets.map(asset => (
                <li
                    key={asset.id}
                    className="flex items-center p-4 bg-white rounded shadow mb-2 hover:bg-gray-50 transition"
                >
                    {asset.iconUrl &&
                    <img
                        src={asset.iconUrl}
                        alt={`${asset.name} logo`}
                        className="w-12 h-12 object-contain mr-4 rounded-full"
                    />
                    }
                    <div>
                        <div className="flex items-baseline">
                            <span className="text-xl font-bold text-blue-600">{asset.symbol}</span>
                            <span className="ml-2 text-gray-700">{asset.name}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AssetList;
