import { Review } from "../posts/post.model";

export interface Report {
    reviews: Review[];
    averageRating: number;
    averageSweetness: number;
    averagePrice: number;
    favoriteVarietal: string;
    numReds: number;
    numWhites: number;
    numRoses: number
}
