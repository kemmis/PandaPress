import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Post } from "../models/post";
import 'rxjs/add/operator/map';
import { PostListRequest } from "../models/post-list-request";
import { PostList } from "../models/post-list";
@Injectable()
export class PostService {
    constructor(private _http: Http) { }

    getPostBySlug(slug: string): Observable<Post> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const params = new URLSearchParams()
        params.set("slug", slug);

        const getOpts = new RequestOptions({
            headers: headers,
            search: params
        });

        return this._http.get("/api/post/getbyslug/", getOpts).map(res => {
            return res.json();
        });
    }

    getList(request: PostListRequest): Observable<PostList> {
        const body = JSON.stringify(request);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http
            .post("/api/post/getlist", body, options)
            .map(res => res.json() || 0);
    }
}