import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { DataService } from '../../service/data.service';
import { Post } from '../../model/Post';
import { Data } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      this.draw(message);
    });
  }

  draw(subreddit: string) {
    this.postService.getPosts(subreddit).subscribe(response => {
      this.posts = response.data.children;
    });
  }
}
