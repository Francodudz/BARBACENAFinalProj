import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { Router } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listOfPosts: Post[];

  constructor(private backEndService: BackEndService, private router: Router) { 
    this.listOfPosts = [];
  }

  ngOnInit(): void {
    this.onFetch();
  }

  onSave() {
    this.backEndService.saveData();
  }

  onFetch() {
    this.backEndService.fetchData().subscribe((posts: Post[]) => {
      this.listOfPosts = posts;
      this.router.navigate(['/post-list']);
    });
  }
}