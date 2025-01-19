import PortfolioInvestments from "@/app/portfolios/components/PortfolioInvestments";
import PortfolioReviews from "@/app/portfolios/components/PortfolioReviews";
import apiClient from "@/lib/apiClient";

interface Props {
    params: { id: string };
}

async function PortfolioDetails({ params }: Props) {
    const { id } = params;

    try {
        const response = await apiClient.get(`/api/portfolios/${id}`);
        const portfolioData = response.data;

        const assets = portfolioData.investments.reduce((grouped: any, investment: any) => {
            const assetName = investment.asset.name;

            if (!grouped[assetName]) {
                grouped[assetName] = {
                    id: investment.asset.id,
                    name: assetName,
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

        return (
            <div className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-5">{portfolioData.name}</h1>

                <section className="mb-10">
                    <h2 className="text-xl font-bold mb-3">Investments</h2>
                    <PortfolioInvestments assets={assetsArray} />
                </section>

                <section>
                    <PortfolioReviews reviews={portfolioData.userRatings || []} />
                </section>
            </div>
        );
    } catch (error) {
        console.error(`Error fetching portfolio ${id}:`, error);

        return (
            <div className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-5">Portfolio Details</h1>
                <p className="text-red-500">Failed to load portfolio details. Please try again later.</p>
            </div>
        );
    }
}

export default PortfolioDetails;