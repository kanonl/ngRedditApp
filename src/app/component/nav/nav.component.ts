import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  subreddits: string[];
  active: string = "popular";

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initSubReddits();
  }

  setClass(item: string, idx: number) {
    return {
      "nav-item": true,
      "nav-link": true,
      "active": item === this.active,
      "d-none": idx >= 10,
      "d-sm-block": idx >= 10,
      "d-md-none": idx >= 10
    }
  }

  getSubReddit(subreddit: string): void {
    this.active = subreddit;
    this.dataService.sendMessage(subreddit);
  }

  setSubReddits(display_name?: string[]): void {
    if (display_name)
      this.subreddits = display_name;
    else
      this.initSubReddits();
  }

  initSubReddits(): void {
    this.subreddits = ["news", "askreddit", "pics", "funny", "videos", "worldnews", "todayilearned", "aww", "gaming", "tifu"];
  }

}
