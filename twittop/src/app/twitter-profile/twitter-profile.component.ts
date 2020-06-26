import {Component, OnInit} from '@angular/core';
import {TwitterService} from '../shared/twitter.service';

import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-twitter-profile',
  templateUrl: './twitter-profile.component.html',
  styleUrls: ['./twitter-profile.component.scss']
})
export class TwitterProfileComponent implements OnInit {


  constructor(private twitterService: TwitterService) {
    const model = tf.loadLayersModel('../assets/ml_model/model.json');
    this.getData();
  }

  ngOnInit(): void {
  }

  async getData() {
    const profile: any = await this.twitterService.getUserProfile('elonmusk');

    console.log(profile);

  }

}
