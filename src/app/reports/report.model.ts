import { Review } from "../posts/post.model";

export interface Report {
    reviews: Review[];
    averageRating: number;
    averageSweetness: number;
    averagePrice: number;
    numReds: number;
    numWhites: number;
    numRoses: number
}
