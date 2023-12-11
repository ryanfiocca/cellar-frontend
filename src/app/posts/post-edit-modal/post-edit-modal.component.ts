import { Component, Inject } from '@angular/core';
import axios from 'axios';
import { PostsService } from '../posts.service';
import { Review } from '../post.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-edit-modal',
  templateUrl: './post-edit-modal.component.html',
  styleUrls: ['./post-edit-modal.component.css']
})
export class PostEditModalComponent {

  review: Review;

  constructor(public postsService: PostsService, @Inject(MAT_DIALOG_DATA) public data: Review, public dialogRef: MatDialogRef<PostEditModalComponent>) {
    this.review = {...data};
  }
  
  onEditReview() {
    if (this.isBlank(this.review.rating) || this.isBlank(this.review.wine.winery)) {
      return;
    }

    axios.patch('http://localhost:8080/review', this.review)
      .then(() => {
        this.postsService.updateReviewList();
        this.dialogRef.close();
      })
      .catch(function (error) {
          console.log(error);
      });
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
