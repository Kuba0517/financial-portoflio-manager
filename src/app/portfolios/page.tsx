import {fetchPortfolios} from "@/services/portfolioService";
import PortfolioList from "@/app/portfolios/components/PortfolioList";
import {PortfolioResponseDTO} from "@/dtos/portfolio.dto";

export default async function PortfoliosPage() {
    const portfolios: PortfolioResponseDTO[] = await fetchPortfolios();

    return (
        <>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Portfolios</h1>
                <PortfolioList portfolios={portfolios}/>
            </div>
        </>
    );
}

