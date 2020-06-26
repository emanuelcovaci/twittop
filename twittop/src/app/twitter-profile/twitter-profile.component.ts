import {Component, OnInit} from '@angular/core';
import {TwitterService} from '../shared/twitter.service';


@Component({
  selector: 'app-twitter-profile',
  templateUrl: './twitter-profile.component.html',
  styleUrls: ['./twitter-profile.component.scss']
})
export class TwitterProfileComponent implements OnInit {


  constructor(private twitterService: TwitterService) {
    this.getData();
  }

  ngOnInit(): void {
    var userProfile = {};

    userProfile['statuses_count'] = 1063;
    userProfile['followers_count'] = 88;
    userProfile['friends_count'] = 228;
    userProfile['favourites_count'] = 35;
    userProfile['listed_count'] = 1;
    userProfile['url'] = 1;
    userProfile['time_zone'] = 1;

    console.log(userProfile);


  }

  async getData() {
    const profile: any = await this.twitterService.getUserProfile('elonmusk');

    console.log(profile);

  }

}
