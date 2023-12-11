import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Subject } from "rxjs";
import axios from 'axios';

import { Review } from "./post.model";
import { PostEditModalComponent } from "./post-edit-modal/post-edit-modal.component";

@Injectable({providedIn: 'root'})
export class PostsService {

  private reviews: Review[] = [];
  private reviewsUpdated = new Subject<Review[]>();

  constructor(public dialog: MatDialog) {}

  getPosts() {
    return [...this.reviews]; // Duplicating the array
  }

  getPostUpdateListener() {
    return this.reviewsUpdated.asObservable();
  }

  updateReviewList() {
    axios.get('http://localhost:8080/review', {responseType: 'json'})
      .then((response) => {
        this.reviews = response.data as Review[];
        this.reviewsUpdated.next([...this.reviews])
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  openModal(review: Review): void {
    this.dialog.open(PostEditModalComponent, {
      width: '80%',
      data: review
    });
  }

}
