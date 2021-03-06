import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SearchComponent} from './search/search.component';
import {TwitterProfileComponent} from './twitter-profile/twitter-profile.component';


const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'twitter-profile/:username', component: TwitterProfileComponent},
  { path: '**', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
