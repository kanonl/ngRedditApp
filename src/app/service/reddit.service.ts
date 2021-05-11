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
    url.pathname = `/r/${subreddit}.json`;
    url.search = new URLSearchParams({
      "limit": "75"
    }).toString();

    return this.http.get<any>(url.toString());
  }

  getPosts2(subreddit: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = `/api/v1/games.json`;
    url.search = new URLSearchParams({
      "limit": "75"
    }).toString();

    const httpOptions = this.getHttpOptions(sessionStorage.getItem("access_token"));

    return this.http.get<any>(url.toString(), httpOptions);
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
    url.search = new URLSearchParams({
      "limit": "75"
    }).toString();

    const httpOptions = this.getHttpOptions(access_token);

    return this.http.get<any>(url.toString(), httpOptions);
  }

  getPopularSubreddits(): Observable<any> {
    let url = new URL("https://www.reddit.com");
    url.pathname = "/subreddits/popular.json";

    return this.http.get<any>(url.toString());
  }

  saveLinkOrComment(access_token: string, name: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = "/api/save";

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${this.token_type} ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    return this.http.post<any>(url.toString(), `id=${name}`, httpOptions);
  }

  getSaveLinkOrComment(access_token: string, username: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = `/user/${username}/saved`

    const httpOptions = this.getHttpOptions(access_token);

    return this.http.get<any>(url.toString(), httpOptions);
  }

  hideLink(access_token: string, name: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = "/api/hide";

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${this.token_type} ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    return this.http.post<any>(url.toString(), `id=${name}`, httpOptions);
  }

  getHideLink(access_token: string, username: string): Observable<any> {
    let url = new URL("https://oauth.reddit.com");
    url.pathname = `/user/${username}/hidden`

    const httpOptions = this.getHttpOptions(access_token);

    return this.http.get<any>(url.toString(), httpOptions);
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
