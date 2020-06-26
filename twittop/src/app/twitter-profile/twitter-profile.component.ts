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

  constructor(private twitterService: TwitterService,
              private flaskServer: FlaskServerService,
              private route: ActivatedRoute) {
    this.getData();
  }

  ngOnInit(): void {
    var userProfile: UserProfile = {};

    userProfile.statuses_count = 1063;
    userProfile.followers_count = 88;
    userProfile.friends_count = 228;
    userProfile.favourites_count = 35;
    userProfile.listed_count = 1;
    userProfile.url = 1;
    userProfile.time_zone = 1;

    console.log(userProfile);
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
    this.getAnalyze(userProfile);
    this.flaskServer.testServer().then(response => {
      console.log(response);
    });


  }

  async getData() {
    const profile: any = await this.twitterService.getUserProfile('elonmusk');

    console.log(profile);

  }

  getAnalyze(userProfile) {
    this.flaskServer.analyze(userProfile).then((response) => {
      console.log(response);
    });
  }

}
