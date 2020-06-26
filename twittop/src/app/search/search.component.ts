import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public username = '';

  constructor(private route: Router) {
  }

  ngOnInit(): void {

  }

  onClickGo() {
    console.log(this.username);
    this.route.navigate(['/twitter-profile/'+this.username, ]);
  }

}
