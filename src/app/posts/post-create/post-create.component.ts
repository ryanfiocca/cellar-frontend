import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Review } from "../post.model";
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
        if (postForm.invalid) {
            return;
        }

        axios.put('http://localhost:8080/review', {
                rating: parseInt(postForm.value.rating),
                winery: postForm.value.winery,
                userId: 1,
                sweetness: this.isEmpty(postForm.value.sweetness) ? null : parseInt(postForm.value.sweetness), 
                body: this.isEmpty(postForm.value.body) ? null : postForm.value.body, 
                color: this.isEmpty(postForm.value.color) ? null : postForm.value.color, 
                varietal: this.isEmpty(postForm.value.varietal) ? null : postForm.value.varietal, 
                vintage: this.isEmpty(postForm.value.vintage) ? null : parseInt(postForm.value.vintage), 
                abv: this.isEmpty(postForm.value.abv) ? null : parseFloat(postForm.value.abv),
                region: this.isEmpty(postForm.value.region) ? null : postForm.value.region, 
                price: this.isEmpty(postForm.value.price) ? null : parseFloat(postForm.value.price), 
                source: this.isEmpty(postForm.value.source) ? null : postForm.value.source, 
                effervescence: this.isEmpty(postForm.value.effervescence) ? null : postForm.value.effervescence, 
                notes: this.isEmpty(postForm.value.notes) ? null : postForm.value.notes
            })
            .then(() => this.postsService.updateReviewList())
            .catch(function (error) {
                console.log(error);
            });
        
        postForm.resetForm();
    }

    isEmpty(str): boolean {
        if (typeof str == 'number') {
            return false;
        }
        return str == null || !str.trim();
    }

}
