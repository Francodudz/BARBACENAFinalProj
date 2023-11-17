import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) { }

  saveData() {
    const listOfPosts: Post[] = this.postService.getPost();
    this.http.put(
      'https://myfirebase-59e34-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      listOfPosts)
      .subscribe((res) => {
        console.log(res)
      })
  }

  fetchData() {
    return this.http.get<Post[]>('https://myfirebase-59e34-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(
        tap((listOfPosts: Post[]) => {
          listOfPosts.forEach(post => {
            if (!Array.isArray(post.comments)) {
              post.comments = [];
            }
          });
          console.log(listOfPosts)
          this.postService.setPosts(listOfPosts);
        })
      );
  }
}