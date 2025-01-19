import dotenv from 'dotenv';
import axios from 'axios';
import PQueue from 'p-queue';
import connectToDatabase from '../lib/mongodb';
import Asset, { Asset as AssetModel } from '../models/Asset';
import mongoose from "mongoose";
import { StockType } from "@/types/AssetType";

dotenv.config({ path: '.env.local' });

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

if (!FINNHUB_API_KEY) {
    throw new Error('FINNHUB_API_KEY is not defined in .env');
}

async function fetchSymbols(exchanges: string[] = ['US']): Promise<string[]> {
    try {
        const allSymbols: string[] = [];
        for (const exchange of exchanges) {
            const response = await axios.get(`${FINNHUB_BASE_URL}/stock/symbol`, {
                params: {
                    exchange,
                    token: FINNHUB_API_KEY,
                },
            });
            allSymbols.push(...response.data.map((item: any) => item.symbol));
        }

        return allSymbols;
    } catch (error: any) {
        console.error('Błąd podczas pobierania symboli:', error.message);
        return [];
    }
}

async function fetchAssetDetails(symbol: string): Promise<Partial<AssetModel> | null> {
    try {
        const profileResponse = await axios.get(`${FINNHUB_BASE_URL}/stock/profile2`, {
            params: {
                symbol,
                token: FINNHUB_API_KEY,
            },
        });

        const profile = profileResponse.data;

        if (!profile) {
            console.warn(`Brak profilu dla symbolu: ${symbol}`);
            return null;
        }

        const asset: Partial<AssetModel> = {
            symbol: symbol.toUpperCase(),
            name: profile.name || symbol.toUpperCase(),
            type: StockType.STOCK,
            description: profile.description || '',
            iconUrl: profile.logo || '',
            webUrl: profile.weburl
        };

        return asset;
    } catch (error: any) {
        console.error(`Błąd podczas pobierania danych dla symbolu ${symbol}:`, error.message);
        return null;
    }
}

async function main() {
    try {
        await connectToDatabase();
        console.log('Połączono z MongoDB.');
    } catch (error: any) {
        console.error('Błąd połączenia z MongoDB:', error.message);
        process.exit(1);
    }

    const symbols = await fetchSymbols();

    if (symbols.length === 0) {
        console.error('Brak symboli do przetworzenia. Zakończono skrypt.');
        process.exit(1);
    }

    const queue = new PQueue({
        interval: 1000,
        intervalCap: 20,
    });

    let processed = 0;
    let successful = 0;
    let skipped = 0;
    let failed = 0;

    for (const symbol of symbols) {
        await queue.add(async () => {
            const existingAsset = await Asset.findOne({ symbol });
            if (existingAsset) {
                console.log(`Symbol ${symbol} już istnieje w bazie danych. Pomijanie.`);
                skipped++;
                processed++;
                return;
            }

            const assetDetails = await fetchAssetDetails(symbol);

            if (assetDetails) {
                try {
                    await Asset.create(assetDetails);
                    console.log(`Dodano nowy symbol: ${assetDetails.symbol}`);
                    successful++;
                } catch (error: any) {
                    console.error(`Błąd podczas zapisywania symbolu ${symbol}:`, error.message);
                    failed++;
                }
            } else {
                console.warn(`Brak danych dla symbolu: ${symbol}`);
                failed++;
            }

            processed++;
            if (processed % 100 === 0) {
                console.log(`Przetworzono ${processed}/${symbols.length} symboli.`);
            }
        });
    }

    await queue.onIdle();

    console.log('Skrypt zakończony.');
    console.log(`Przetworzono: ${processed}`);
    console.log(`Dodano nowe: ${successful}`);
    console.log(`Pominięto istniejące: ${skipped}`);
    console.log(`Niepowodzenia: ${failed}`);

    await mongoose.disconnect();
}

main().catch(error => {
    console.error('Nieoczekiwany błąd:', error);
    process.exit(1);
});
