import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) {
  }

  getTweets(count: number, username: string): Promise<Array<any>> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:7890/1.1/statuses/user_timeline.json?count=${count}&screen_name=${username}`).subscribe(data => {
        resolve((data as Array<any>));
      });
    });
  }

  getUserProfile(username: string) {
    return new Promise(resolve => {
      this.http.get(`http://localhost:7890/1.1/users/show.json?screen_name=${username}`).subscribe(data => {
        resolve((data as Array<any>));
      });
    });
  }


}
