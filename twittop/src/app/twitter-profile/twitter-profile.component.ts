import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TwitterService} from '../shared/twitter.service';
import {FlaskServerService} from '../shared/flask-server.service';
import {ReportDialogComponent} from './report-dialog/report-dialog.component';


import {UserProfile} from '../shared/flask-server.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FsService} from 'ngx-fs';

declare var fs: any;

@Component({
  selector: 'app-twitter-profile',
  templateUrl: './twitter-profile.component.html',
  styleUrls: ['./twitter-profile.component.scss']
})
export class TwitterProfileComponent implements OnInit, OnDestroy {

  public username = '';
  public userProfile: UserProfile = new UserProfile();
  public tweetRows: Array<any> = [];

  public name = '';
  public profile_img = '';
  public profile_bg_img = '';
  public description = '';
  public created_at: any;
  public location: any = null;
  public fake: boolean = null;
  public result_img = '../../assets/loading2.gif';
  public report_message = '';
  public verified = false;
  public userTweets: Array<any>;
  public stringValue = 'Fake';
  public profileDataAll: any = null;

  constructor(private twitterService: TwitterService,
              private flaskServer: FlaskServerService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private fsService: FsService) {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
    this.getData(this.username).finally(() => {
      console.log(this.userProfile);

      if (this.verified == false) {
        this.getAnalyze(this.userProfile);
      } else {
        this.result_img = '../../assets/real.svg';
        this.report_message = 'From our report this account is genuine.';
        this.stringValue = 'REAL';
      }

    });

    this.loadTweets();


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
    this.profileDataAll = profile;
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
    console.log('----');
    console.log(this.userProfile);

    this.name = profile.name;
    this.profile_img = profile.profile_image_url_https;
    this.profile_bg_img = profile.profile_banner_url;
    this.description = profile.description;
    this.created_at = moment(profile.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
    this.created_at = moment(this.created_at, 'YYYYMMDD').fromNow();
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
        this.stringValue = 'FAKE';

      } else {
        this.result_img = '../../assets/real.svg';
        this.report_message = 'From our report this account is genuine.';
        this.stringValue = 'REAL';
      }
    });
  }

  async loadTweets() {
    this.tweetRows = [];
    const numberOfTweets = 50;

    this.userTweets = await this.twitterService.getTweets(numberOfTweets, this.username);

    console.log(this.userTweets);
  }

  openDialog() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(ReportDialogComponent, {
        data: {
          message: 'Are you really sure that ' + this.username + ' it\'s not a  ' + this.stringValue + ' twitter account?',
          buttonText: {
            ok: 'Yes, I\'m sure',
            cancel: 'No'
          }
        }
      });
      const snack = this.snackBar.open('Send your feedback');

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          let send_feedback = {
            profile_data: this.profileDataAll,
            username: this.username,
            prediction: this.stringValue,
            user_prediction: !this.fake
          };
          this.flaskServer.sendFeedback(send_feedback).then((data) => {
            console.log(data);
          });
          snack.dismiss();
          const a = document.createElement('a');
          a.click();
          a.remove();
          snack.dismiss();
          this.snackBar.open('Thank you for your feedback. We will use your feedback for future improvement.', 'Hide', {
            duration: 3000,
          });
        }
      });
    }, 0);

  }


}
