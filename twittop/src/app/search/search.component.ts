import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
    this.route.navigate(['/twitter-profile/' + this.username,]);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      if (this.username != '') {
        this.onClickGo();
      }
    }
  }

}
