import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private subreddits: string[] = ["all", "games", "pcgaming", "technology", "hardware"];
  private active: string = "all";

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  setClass(item: string) {
    return {
      "nav-item": true,
      "nav-link": true,
      "active": item === this.active
    }
  }

  getSubReddit(subreddit: string): void {
    this.active = subreddit;
    this.dataService.sendMessage(subreddit);
  }

  setSubReddits(display_name: string[]): void {
    this.subreddits = display_name;
  }

}
