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

export interface ReviewRequest {
    rating: number;
    winery: string;
    userId: number;
    sweetness: number;
    body: string;
    color: string;
    varietal: string;
    vintage: string;
    abv: number;
    region: string;
    price: number;
    source: string;
    effervescence: string;
    notes: string;
}
