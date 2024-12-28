interface PortfolioListItemProps {
    id: string;
    name: string;
    userName?: string;
}

export default function PortfolioListItem({id, name, userName}: PortfolioListItemProps) {
    return (
        <li className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold">{userName || ""}</h2>
            <p>{name}</p>
            <a
    href={`/portfolios/${id}`}
    className="text-primary hover:underline mt-2 inline-block"
        >
        View Details
    </a>
    </li>
);
}
