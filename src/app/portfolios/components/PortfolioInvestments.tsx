import ExpandableList from "@/shared/components/ExpendableList";
import InvestmentCard from "@/shared/components/InvestmentCard";

interface Investment {
    id: string;
    quantity: number;
    purchasePrice: number;
    assetIconUrl: string;
    assetTicker: string;
}

interface Asset {
    id: string;
    name: string;
    investments: Investment[];
}

interface PortfolioInvestmentsProps {
    assets: Asset[];
}

function PortfolioInvestments({ assets }: PortfolioInvestmentsProps) {
    return (
        <div>
            {assets.map((asset) => (
                <ExpandableList key={asset.id} title={asset.name}>
                    <ul key={asset.id} className="space-y-4">
                        {asset.investments.map((investment) => (
                            <li key={investment.id}>
                                <InvestmentCard
                                    assetIconUrl={investment.assetIconUrl}
                                    assetName={asset.name}
                                    assetTicker={investment.assetTicker}
                                    quantity={investment.quantity}
                                    purchasePrice={investment.purchasePrice}
                                />
                            </li>
                        ))}
                    </ul>
                </ExpandableList>
            ))}
        </div>
    );
}

export default PortfolioInvestments;
