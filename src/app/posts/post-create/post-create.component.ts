import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Review, User, Wine } from "../post.model";
import { PostsService } from "../posts.service";
import axios from 'axios';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    constructor(public postsService: PostsService) {}

    onAddReview(postForm: NgForm) {
        if (postForm.invalid || this.isBlank(postForm.value.rating) || this.isBlank(postForm.value.winery)) {
            return;
        }

        var wine: Wine = {
            wineId: null,
            winery: postForm.value.winery,
            color: this.nullIfBlank(postForm.value.color),
            varietal: this.nullIfBlank(postForm.value.varietal),
            region: this.nullIfBlank(postForm.value.region),
            vintage: this.nullIfBlank(postForm.value.vintage),
            abv: this.nullIfBlank(postForm.value.abv),
            effervescence: this.nullIfBlank(postForm.value.effervescence),
            price: this.nullIfBlank(postForm.value.price),
            source: this.nullIfBlank(postForm.value.source),
        }

        var user: User = {
            userId: 1,
            firstName: "Ryan",
            lastName: "Fiocca"
        }

        var review: Review = {
            reviewId: null,
            user: user,
            wine: wine,
            rating: postForm.value.rating,
            sweetness: this.nullIfBlank(postForm.value.sweetness),
            body: this.nullIfBlank(postForm.value.body),
            notes: this.nullIfBlank(postForm.value.notes),
        }

        axios.put('http://localhost:8080/review', { review })
            .then(() => this.postsService.updateReviewList())
            .catch(function (error) {
                console.log(error);
            });
        
        postForm.resetForm();
    }

    nullIfBlank(value: any) {
        if (typeof value == 'number') {
            return value
        }
        return this.isBlank(value) ? null : value.toString().trim();
    }

    isBlank(value: any): boolean {
        if (typeof value == 'number') {
            return false;
        }
        return value == null || !value.trim();
    }

}
