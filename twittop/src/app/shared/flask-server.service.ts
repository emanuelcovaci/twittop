import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface UserProfile {
  statuses_count: number;
  followers_count: number;
  friends_count: number;
  favourites_count: number;
  listed_count: number;
  url: number;
  time_zone: number;

}

@Injectable({
  providedIn: 'root'
})
export class FlaskServerService {
  private ip = 'http://127.0.0.1:5000';

  constructor(public http: HttpClient) {
  }

  analyze(userProfile: UserProfile) {
    return this.http.post<UserProfile>(this.ip + '/analyze_profile', {
      userProfile
    }).toPromise().then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  }

  testServer() {
    return this.http.get(this.ip + '/test').toPromise().then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  }

}
