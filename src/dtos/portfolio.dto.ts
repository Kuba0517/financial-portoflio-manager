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