import apiClient from "@/lib/apiClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserRole } from "@/types/UserRoles";
import ClientSideWrapper from "@/app/portfolios/components/ClientSideWrapper";

interface PortfolioDetailsProps {
    params: { id: string };
}

export default async function PortfolioDetails({ params }: PortfolioDetailsProps) {
    const { id } = params;

    try {
        const session = await getServerSession(authOptions);

        const response = await apiClient.get(`/api/portfolios/${id}`);
        const portfolioData = response.data;

        const isOwner = portfolioData.userId === session?.user?.id;
        const isModerator = session?.user?.role === UserRole.MODERATOR;
        const isAdmin = session?.user?.role === UserRole.ADMIN;
        const canEdit = isOwner || isModerator || isAdmin;

        const assets = portfolioData.investments.reduce((grouped: any, investment: any) => {
            const assetName = investment.asset.name;
            if (!grouped[assetName]) {
                grouped[assetName] = {
                    id: investment.asset.id,
                    name: assetName,
                    iconUrl: investment.asset.iconUrl,
                    investments: [],
                };
            }
            grouped[assetName].investments.push({
                id: investment.id,
                quantity: investment.quantity,
                purchasePrice: investment.purchasePrice,
            });
            return grouped;
        }, {});
        const assetsArray = Object.values(assets);

        console.log(assetsArray)

        return (
            <ClientSideWrapper
                session={session}
                portfolioData={portfolioData}
                canEdit={canEdit}
                assetsArray={assetsArray}
                isOwner={isOwner}
            />
        );
    } catch (error) {
        return (
            <div className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-5">Portfolio Details</h1>
                <p className="text-red-500">
                    Failed to load portfolio details. Please try again later.
                </p>
            </div>
        );
    }
}
