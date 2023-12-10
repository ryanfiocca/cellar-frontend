import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Review } from "../post.model";
import { PostsService } from "../posts.service";
import axios from 'axios';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  reviews: Review[] = []
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  onDelete(reviewId: number) {
    axios.delete('http://localhost:8080/review', { params: { reviewId: reviewId } } )
      .then(() => this.postsService.updateReviewList())
      .catch(function (error) {
        console.log(error);
    });
  }

  constructWineLabel(review: Review) {
    var label: string = review.rating + ' - ' + review.wine.winery;
    if (review.wine.varietal != null) {
      return label += ' ' + review.wine.varietal;
    } else if (review.wine.color != null) {
      return label += ' ' + review.wine.color;
    }
    return label;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  ngOnInit() {
    this.reviews = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
    this.postsService.updateReviewList();
  }

}
