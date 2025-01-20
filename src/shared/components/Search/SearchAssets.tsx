import React, { useState, ChangeEvent, useMemo } from "react";
import AssetList from "@/shared/components/Search/AssetsList";
import apiClient from "@/lib/apiClient";
import { AssetSearchResponseDTO } from "@/dtos/asset.dto";
import debounce from "lodash.debounce";
import Input from "@/shared/components/Input";

interface SearchAssetsProps {
    onAssetSelect: (asset: AssetSearchResponseDTO) => void;
}

const SearchAssets: React.FC<SearchAssetsProps> = ({ onAssetSelect }) => {
    const [query, setQuery] = useState<string>("");
    const [assets, setAssets] = useState<AssetSearchResponseDTO[]>([]);
    const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const debouncedFetchAssets = useMemo(
        () =>
            debounce(async (searchQuery: string) => {
                if (!searchQuery) {
                    setAssets([]);
                    setIsLoading(false);
                    setError("");
                    return;
                }

                try {
                    setIsLoading(true);
                    setError("");
                    const response = await apiClient.get("/api/assets/search", {
                        params: { query: searchQuery },
                    });
                    setAssets(response.data.results);
                } catch (err) {
                    console.error("Error fetching assets:", err);
                    setError("Failed to fetch assets.");
                } finally {
                    setIsLoading(false);
                }
            }, 500),
        []
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetchAssets(value);
    };

    const handleAssetClick = (asset: AssetSearchResponseDTO) => {
        setSelectedAssetId(asset.id);
        onAssetSelect(asset);
    };

    React.useEffect(() => {
        return () => {
            debouncedFetchAssets.cancel();
        };
    }, [debouncedFetchAssets]);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <div className={"p-5 bg-mainGreen-500 rounded-md"}>
                <Input
                    label="Search Assets"
                    value={query}
                    onChange={handleChange}
                    placeholder="Type asset name..."
                />
            </div>
            {isLoading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            <AssetList assets={assets} onClick={handleAssetClick} selectedAssetId={selectedAssetId} />
        </div>
    );
};

export default SearchAssets;

