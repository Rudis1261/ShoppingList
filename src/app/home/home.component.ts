import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '../keys-pipe.component';
import { LimitToPipe } from '../limit-to.pipe';
import { AngularFire } from 'angularfire2';

declare var videojs: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loaded: boolean = false;
  data: any;
  auth: any = false;
  newItem: any;
  directoryFeed: any;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if(auth && auth.auth) {
        this.auth = auth.auth;
        this.getItems();
      }
    });
  };

  addItem(): any {
    if (!this.newItem || this.newItem == '') return false;
    this.directoryFeed.push(this.newItem);
    this.newItem = '';
  }

  removeItem(item) {
    if (!item && !item.$key) return false;
    this.directoryFeed.remove(item.$key);
  }

  getItems(): void {
    this.directoryFeed = this.af.database.list('/items');
    this.directoryFeed.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {}
}
