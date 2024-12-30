'use client';

import React, { useState, ChangeEvent, useMemo } from 'react';
import AssetList from "@/app/asset-test/components/AssetsList";
import apiClient from '@/lib/apiClient';
import {AssetSearchResponseDTO} from "@/dtos/asset.dto";
import debounce from "lodash.debounce"
import {FaMagnifyingGlass} from "react-icons/fa6";

const SearchAssets: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [assets, setAssets] = useState<AssetSearchResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const debouncedFetchAssets = useMemo(() => debounce(async (searchQuery: string) => {
        if (!searchQuery) {
            setAssets([]);
            setIsLoading(false);
            setError('');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const response = await apiClient.get('/api/assets/search', { params: { query: searchQuery } });
            setAssets(response.data.results);
        } catch (err: unknown) {
            console.error('Error fetching assets:', err);
            setError('Failed to fetch assets.');
        } finally {
            setIsLoading(false);
        }
    }, 500), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetchAssets(value);
    };

    React.useEffect(() => {
        return () => {
            debouncedFetchAssets.cancel();
        };
    }, [debouncedFetchAssets]);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaMagnifyingGlass/>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search assets..."
                    className="w-full outline-none text-gray-700"
                />
            </div>
            {isLoading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            <AssetList assets={assets} />
        </div>
    );
};

export default SearchAssets;
