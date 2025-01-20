import PortfolioList from "@/app/portfolios/components/PortfolioList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {UserRole} from "@/types/UserRoles";

export default async function PortfoliosPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-8 max-w-screen-xl m-auto">
            <h1 className="text-2xl font-bold mb-4">Portfolios</h1>
            <PortfolioList session={session} />
        </div>
    );
}
