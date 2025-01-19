export interface PortfolioCreateDTO {
    name: string;
    user: string;
}

export interface PortfolioResponseDTO {
    id: string;
    name: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
}

export interface PortfolioDTO {
    id: string;
    name: string;
    createdAt: string;
    investments: Array<{
        quantity: number;
        purchasePrice: number;
        asset: {
            id: string;
            name: string;
            symbol: string;
            description: string;
            iconUrl: string;
            webUrl: string;
        };
    }>;
    userRatings: Array<{
        rating: number;
        comment: string;
        userId: string;
        createdAt: string;
    }>;
}