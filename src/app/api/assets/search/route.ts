import connectToDatabase from '@/lib/mongodb';
import Asset from "@/models/Asset";
import {AssetSearchResponseDTO} from "@/dtos/asset.dto";

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const {searchParams} = new URL(req.url);
        const query = searchParams.get("query") || '';

        console.log(query);

        if (!query) {
            return Response.json({error: "Missing query"}, {status: 404});
        }

        const regex = new RegExp(query, "i");


        const assets = await Asset.find({
            $or: [
                {name: {$regex: regex}},
                {symbol: {$regex: regex}}
            ]
        })
            .limit(20);


        const results: AssetSearchResponseDTO[] = assets.map((asset) => {
            return {
            id: asset._id.toString(),
            name: asset.name,
            symbol: asset.symbol,
            iconUrl: asset.iconUrl,
        }
        })

        return Response.json({results}, {status: 200});

    } catch (error) {
        if (error instanceof Error) {
            return Response.json({error: error.message}, {status: 500});
        }
    }
}

