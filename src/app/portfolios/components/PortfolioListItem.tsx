interface PortfolioListItemProps {
    id: string;
    name: string;
    userName?: string;
}

export default function PortfolioListItem({id, name, userName}: PortfolioListItemProps) {
    return (
        <li
            className={`
        p-4
        bg-mainGreen-100
        text-mainGreen-900
        rounded-lg
        shadow
        border border-mainGreen-200
        transition-shadow
        duration-300
        hover:shadow-md
      `}
        >
            {userName && (
                <h2
                    className={`
            mb-2 
            text-lg
            font-semibold
            tracking-wide
            uppercase
            text-mainGreen-800
          `}
                >
                    {userName}
                </h2>
            )}
            <p className="mb-2 text-base">
                {name}
            </p>
            <a
                href={`/portfolios/${id}`}
                className={`
          inline-block
          mt-2
          px-4
          py-2
          rounded
          bg-white
          text-mainGreen-900
          font-semibold
          hover:bg-mainGreen-200
          transition-colors
          duration-300
        `}
            >
                View Details
            </a>
        </li>
    );
}
