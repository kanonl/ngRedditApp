import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedditService {
  private token_type: string = "bearer";

  constructor(private http: HttpClient) { }

  getPosts(subreddit: string): Observable<any> {
    let url = new URL("https://www.reddit.com");
    url.pathname = `/r/${subreddit}/.json`;
    url.search = new URLSearchParams({
      "limit": "75"
    }).toString();
    return this.http.get<any>(url.toString());
  }

  getUser(access_token: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = "/api/v1/me";

    const httpOptions = this.getHttpOptions(access_token);

    return this.http.get<any>(url.toString(), httpOptions);
  }

  getSubscribedSubreddits(access_token: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = "/subreddits/mine/subscriber";

    const httpOptions = this.getHttpOptions(access_token);

    return this.http.get<any>(url.toString(), httpOptions);
  }

  getPopularSubreddits(): Observable<any> {
    let url = new URL("https://www.reddit.com");
    url.pathname = "/subreddits/popular.json";

    return this.http.get<any>(url.toString());
  }

  private getHttpOptions(access_token: string): Object {
    let httpOptions: Object = {
      headers: new HttpHeaders({
        "Authorization": `${this.token_type} ${access_token}`
      })
    };

    return httpOptions;
  }
}
