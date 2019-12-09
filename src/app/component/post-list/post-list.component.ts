import { Component, OnInit } from '@angular/core';
import { RedditService } from '../../service/reddit.service';
import { DataService } from '../../service/data.service';
import { Post } from '../../model/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(private redditService: RedditService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      this.draw(message);
    });
  }

  draw(subreddit: string) {
    this.redditService.getPosts(subreddit).subscribe(response => {
      this.posts = response.data.children;
    });
  }
}
