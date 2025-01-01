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
        <ul className="mt-4 bg-mainGreen-600 p-5 rounded-2xl max-h-[50vh] overflow-y-auto">
            {assets.map(asset => (
                <li
                    key={asset.id}
                    className="flex items-center p-4 bg-mainGreen-300 shadow mb-2 hover:bg-mainGreen-400 transition rounded-xl"
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
