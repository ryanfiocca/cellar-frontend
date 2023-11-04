import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import axios from 'axios';

import { Review } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

  private reviews: Review[] = [];
  private reviewsUpdated = new Subject<Review[]>();

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

}
