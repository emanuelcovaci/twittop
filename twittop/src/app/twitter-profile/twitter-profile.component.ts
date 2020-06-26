import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TwitterService} from '../shared/twitter.service';
import {FlaskServerService} from "../shared/flask-server.service";

import {UserProfile} from "../shared/flask-server.service";
import * as moment from 'moment';


@Component({
  selector: 'app-twitter-profile',
  templateUrl: './twitter-profile.component.html',
  styleUrls: ['./twitter-profile.component.scss']
})
export class TwitterProfileComponent implements OnInit, OnDestroy {

  public username: string = '';
  public userProfile: UserProfile = new UserProfile();

  public name: string = '';
  public profile_img: string = '';
  public profile_bg_img: string = '';
  public description: string = '';
  public created_at: any;
  public location: any = null;
  public fake: boolean = null;
  public result_img: string = '';
  public report_message: string = '';
  public verified: boolean = false;

  constructor(private twitterService: TwitterService,
              private flaskServer: FlaskServerService,
              private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
    this.getData(this.username).finally(() => {
      console.log(this.userProfile);

      if (this.verified == false) {
        this.getAnalyze(this.userProfile);
      } else {
        this.result_img = '../../assets/real.svg';
        this.report_message = 'From our report this account is genuine.';
      }

    });


  }

  ngOnInit(): void {


  }

  ngOnDestroy() {
    this.username = '';
    delete this.userProfile;

    this.name = '';
    this.profile_img = '';
    this.profile_bg_img = '';
    this.description = '';
    this.created_at = '';
    this.location = null;
    this.fake = null;
    this.result_img = '';
    this.report_message = '';

  }

  async getData(username: string) {
    const profile: any = await this.twitterService.getUserProfile(username);

    console.log(profile);
    this.userProfile.statuses_count = profile.statuses_count;
    this.userProfile.followers_count = profile.followers_count;
    this.userProfile.friends_count = profile.friends_count;
    this.userProfile.favourites_count = profile.favourites_count;
    this.userProfile.listed_count = profile.listed_count;
    if (profile.url !== null) {
      this.userProfile.url = 1;
    } else {
      this.userProfile.url = 0;
    }
    if (profile.time_zone !== null || profile.location !== '') {
      this.userProfile.time_zone = 1;
    } else {
      this.userProfile.time_zone = 0;
    }
    console.log("----");
    console.log(this.userProfile);

    this.name = profile.name;
    this.profile_img = profile.profile_image_url_https;
    this.profile_bg_img = profile.profile_banner_url;
    this.description = profile.description;
    this.created_at = moment(profile.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
    this.created_at = moment(this.created_at, "YYYYMMDD").fromNow();
    this.location = profile.location;
    this.verified = profile.verified;


  }

  async getAnalyze(userProfile) {
    this.flaskServer.analyze(userProfile).then((response) => {
      console.log(response);
      this.fake = response.fake;
      if (this.fake === true) {
        this.result_img = '../../assets/fake.svg';
        this.report_message = 'From our report this account is FAKE.';

      } else {
        this.result_img = '../../assets/real.svg';
        this.report_message = 'From our report this account is genuine.';
      }
    });
  }

}
