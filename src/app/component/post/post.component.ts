import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../model/Post';
import { RedditService } from '../../service/reddit.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private redditService: RedditService) { }

  ngOnInit() {
  }

  stickied(post: Post) {
    return {
      "stickied": post.stickied
    }
  }

  save(name: string): void {
    this.redditService.saveLinkOrComment(sessionStorage.getItem("access_token"), name).subscribe(console.log, console.log);
  }

  hide(name: string): void {
    this.redditService.hideLink(sessionStorage.getItem("access_token"), name).subscribe(console.log, console.log);
  }

  private errorHandler(err): void {
    console.log(err);
  }

}
