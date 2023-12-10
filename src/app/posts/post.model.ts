export interface Review {
    reviewId: number;
    user: User;
    wine: Wine;
    rating: number;
    sweetness: number;
    body: string;
    notes: string;
}

export interface Wine {
    wineId: number;
    winery: string;
    color: string;
    varietal: string;
    region: string;
    vintage: number;
    abv: number;
    effervescence: string;
    price: number;
    source: string;
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
}
