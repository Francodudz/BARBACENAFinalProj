import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import {Post} from '../post.model';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  private postsSub!: Subscription;
  listOfPosts!: Post[];

  constructor(private postService: PostService, private backEndService: BackEndService) {}

  ngOnInit(): void {
    this.listOfPosts = this.postService.getPost();
  
    this.postsSub = this.postService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.listOfPosts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
  
  


