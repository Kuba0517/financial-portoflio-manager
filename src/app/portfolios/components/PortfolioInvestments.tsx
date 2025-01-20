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
    iconUrl: string;
    investments: Investment[];
}

interface PortfolioInvestmentsProps {
    assets: Asset[];
}

function PortfolioInvestments({ assets }: PortfolioInvestmentsProps) {
    console.log(assets)
    return (
        <div>
            {assets.map((asset) => (
                <ExpandableList key={asset.id} title={asset.name}>
                    <ul className="space-y-4">
                        {asset.investments.map((investment) => (
                            <li key={`${investment.id}-${asset.id}`}>
                                <InvestmentCard
                                    assetIconUrl={asset.iconUrl}
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
