import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public userType: Boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log('Esta es la direccion actual ' + window.location.href)

    if(window.location.href == 'http://localhost:4200/clients' || window.location.href == 'http://localhost:4200/sellers'  || window.location.href == 'http://localhost:4200/bicycles'){
      this.userType = true
    }else{
      this.userType = false
    }
  }

}
