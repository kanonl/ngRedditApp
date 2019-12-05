import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(subreddit: string): Observable<any> {
    let url = new URL("https://www.reddit.com");
    url.pathname = `/r/${subreddit}/.json`;
    url.search = new URLSearchParams({
      "limit": "75"
    }).toString();
    return this.http.get<any>(url.toString());
  }
}
