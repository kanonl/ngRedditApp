import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OAuth2 } from '../../../model/Oauth2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() subreddits: EventEmitter<any> = new EventEmitter();

  isLoggedIn: boolean;
  name: string;
  comment_karma: string;
  link_karma: string;
  icon_img: string;
  created_utc: string;

  constructor(private http: HttpClient, private elementRef: ElementRef) { }

  ngOnInit() {
    let url: URL = new URL(window.location.href);
    let result: OAuth2 = this.parseHash(url);

    if (result.state && sessionStorage.getItem("state") === result.state) {
      sessionStorage.setItem("access_token", result.access_token);
      sessionStorage.setItem("token_type", result.token_type);
      this.isLoggedIn = true;
      this.getUser();
    }
  }

  login(): void {
    const state: string = this.getState();
    sessionStorage.setItem("state", state);
    let url: URL = new URL("https://www.reddit.com");
    url.pathname = "/api/v1/authorize.compact";
    url.search = new URLSearchParams({
      "client_id": environment.client_id,
      "response_type": "token",
      "redirect_uri": environment.redirect_uri,
      "scope": "identity mysubreddits",
      "state": state
    }).toString();

    window.location.href = url.toString();
  }

  logout(): void {
    sessionStorage.clear();
    this.isLoggedIn = false;

    // Workaround for sticky bootstrap dropdown menu
    let menu = this.elementRef.nativeElement.querySelector(".dropdown-menu");
    menu.classList.remove("show");

    // Emit null to reset default subreddits
    this.subreddits.emit(null);
  }

  private getState(): string {
    let array = new Uint32Array(2);
    crypto.getRandomValues<any>(array);
    return array.join("");
  }

  private getUser(): void {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = "/api/v1/me";

    let access_token: string = sessionStorage.getItem("access_token");
    let token_type: string = sessionStorage.getItem("token_type");

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${token_type} ${access_token}`
      })
    };

    // TODO: move this to a service
    this.http.get<any>(url.toString(), httpOptions).subscribe(user => {
      this.name = user.name;
      this.comment_karma = user.comment_karma;
      this.link_karma = user.link_karma;
      this.created_utc = new Date(user.created).toDateString();
      this.icon_img = user.icon_img;
      this.mysubreddits();
    }, error => {
      sessionStorage.clear();
      this.isLoggedIn = false;
    });
  }

  private mysubreddits() {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = "/subreddits/mine/subscriber";

    let access_token: string = sessionStorage.getItem("access_token");
    let token_type: string = sessionStorage.getItem("token_type");

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${token_type} ${access_token}`
      })
    };

    // TODO: move this to a service
    this.http.get<any>(url.toString(), httpOptions).subscribe(response => {
      let display_name: string[] = [];
      let subreddits = response.data.children;
      subreddits.forEach((subreddit) => {
        display_name.push(subreddit.data.display_name);
      });
      this.subreddits.emit(display_name);
    });
  }

  private parseHash(url: URL): OAuth2 {
    let hash: string = url.hash.substr(1);

    let result = hash.split('&').reduce<OAuth2>(function (result, item) {
      var parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, new OAuth2());

    return result;
  }

}
