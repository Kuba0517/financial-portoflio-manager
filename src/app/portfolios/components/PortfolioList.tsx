
import PortfolioListItem from "./PortfolioListItem";
import { PortfolioResponseDTO } from "@/dtos/portfolio.dto";
import {UserRole} from "@/types/UserRoles";
import {useSession} from "next-auth/react";

interface PortfolioListProps {
    portfolios: PortfolioResponseDTO[];
}

export default function PortfolioList({ portfolios }: PortfolioListProps) {
    const {data:session} = useSession();
    const isAdmin = session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.USER;

    if (portfolios.length === 0) {
        return <p>No portfolios found.</p>;
    }

    return (
        <ul className="space-y-4 max-w-screen-xl m-auto">
            {portfolios.map((portfolio) => (
                <PortfolioListItem
                    key={portfolio.id}
                    id={portfolio.id}
                    name={portfolio.name}
                    userName={portfolio.user?.name}
                    isAdmin={isAdmin}
                />
            ))}
        </ul>
    );
}
