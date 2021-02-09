import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public userType: Boolean = true;
  route!: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      if (location.path() == "/clients" || location.path() == "/sellers" || location.path() == "/bicycles") {
        this.userType = true
      } else {
        this.userType = false
      }
    });
  }

  ngOnInit(): void {
  }

}
