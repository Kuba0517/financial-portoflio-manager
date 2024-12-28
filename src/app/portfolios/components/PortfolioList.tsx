import PortfolioListItem from './PortfolioListItem';
import {PortfolioResponseDTO} from "@/dtos/portfolio.dto";

interface PortfolioListProps {
    portfolios: PortfolioResponseDTO[];
}

export default function PortfolioList({portfolios}: PortfolioListProps) {
    if (portfolios.length === 0) {
        return <p>No portfolios found.</p>;
    }

    return (
        <ul className="space-y-4 max-w-screen-xl m-auto">
            {portfolios.map((portfolio) => (
                <PortfolioListItem key={portfolio.id} name={portfolio.name} id={portfolio.id} userName={portfolio.user?.name}/>
            ))}
        </ul>
    );
}
