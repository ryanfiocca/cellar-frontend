import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Review } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  reviews: Review[] = []
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

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
