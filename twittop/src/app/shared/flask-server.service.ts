import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export class UserProfile {
  statuses_count: number;
  followers_count: number;
  friends_count: number;
  favourites_count: number;
  listed_count: number;
  url: number;
  time_zone: number;

  UserProfile(statuses_count = 0, followers_count = 0, friends_count = 0, favourites_count = 0, listed_count = 0, url = 0, time_zone = 0) {
    this.statuses_count = statuses_count;
    this.followers_count = followers_count;
    this.friends_count = friends_count;
    this.favourites_count = favourites_count;
    this.listed_count = listed_count;
    this.url = url;
    this.time_zone = time_zone;
  }

}

@Injectable({
  providedIn: 'root'
})
export class FlaskServerService {
  private ip = 'http://127.0.0.1:5000';

  constructor(public http: HttpClient) {
  }

  analyze(userProfile: UserProfile) {
    console.log("from service");
    console.log(userProfile);
    console.log("end service");
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

  sendFeedback(profile: any) {
    return this.http.post(this.ip + '/send_feedback', {
      profile
    }).toPromise().then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  }

}
