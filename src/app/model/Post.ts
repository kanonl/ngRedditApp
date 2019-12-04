export class Post {
    kind: string;
    data: {
        subreddit: string;
        selftext: string;
        title: string;
        name: string;
        downs: number;
        ups: number;
        thumbnail: string;
        created: number;
        domain: string;
        pinned: boolean;
        over_18: boolean;
        id: string;
        author: string;
        num_comments: number;
        permalink: string;
        stickied: boolean;
        url: string;
        subreddit_subscribers: number;
        link_flair_text: string;
    };
}