import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { RedditService } from '../../service/reddit.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  subreddits: string[] = [];
  active: string = "popular";
  navItemCount: number = 8;

  constructor(private dataService: DataService, private redditService: RedditService) { }

  ngOnInit() {
    this.initSubReddits();
  }

  setClass(item: string, idx: number) {
    return {
      "nav-item": true,
      "nav-link": true,
      "active": item === this.active,
      "d-none": idx >= this.navItemCount,
      "d-sm-block": idx >= this.navItemCount,
      "d-md-none": idx >= this.navItemCount
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
    this.redditService.getPopularSubreddits().subscribe(listing => {
      this.subreddits = [];
      listing.data.children.forEach(element => {
        this.subreddits.push(element.data.display_name);
      });
    });
  }

}
