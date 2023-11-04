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

        // axios.put('http://localhost:8080/review', {
        //     params: {
        //         varietal: postForm.value.varietal,
        //         rating: postForm.value.rating
        //     }})
        //     .then(() => this.postsService.updateReviewList())
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        let url = 'http://localhost:8080/review?varietal=' + postForm.value.varietal + '&rating=' + postForm.value.rating;

        axios.put(url)
            .then(() => this.postsService.updateReviewList())
            .catch(function (error) {
                console.log(error);
            })
        
        postForm.resetForm();
    }

}
