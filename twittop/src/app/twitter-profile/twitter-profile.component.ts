import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TwitterService} from '../shared/twitter.service';
import {FlaskServerService} from "../shared/flask-server.service";

import {UserProfile} from "../shared/flask-server.service";


@Component({
  selector: 'app-twitter-profile',
  templateUrl: './twitter-profile.component.html',
  styleUrls: ['./twitter-profile.component.scss']
})
export class TwitterProfileComponent implements OnInit {

  public username: string = '';
  public userProfile: UserProfile = {};

  constructor(private twitterService: TwitterService,
              private flaskServer: FlaskServerService,
              private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
    this.getData(this.username).finally(() => {
      console.log(this.userProfile);

      this.getAnalyze(this.userProfile);
    });


  }

  ngOnInit(): void {


  }

  async getData(username: string) {
    const profile: any = await this.twitterService.getUserProfile(username);

    console.log(profile);
    this.userProfile.statuses_count = profile.statuses_count;
    this.userProfile.followers_count = profile.followers_count;
    this.userProfile.friends_count = profile.friends_count;
    this.userProfile.favourites_count = profile.favourites_count;
    this.userProfile.listed_count = profile.listed_count;
    if (profile.url = !null) {
      this.userProfile.url = 1;
    } else {
      this.userProfile.url = 0;
    }
    if (profile.time_zone = !null) {
      this.userProfile.time_zone = 1;
    } else {
      this.userProfile.time_zone = 0;
    }
    console.log("----");
    console.log(this.userProfile);

  }

  async getAnalyze(userProfile) {
    this.flaskServer.analyze(userProfile).then((response) => {
      console.log(response);
    });
  }

}
