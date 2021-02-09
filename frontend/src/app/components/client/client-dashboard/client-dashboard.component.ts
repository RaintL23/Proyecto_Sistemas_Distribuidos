import { Component, OnInit } from '@angular/core';
import { Bicycle } from 'src/app/models/bicycle';
import { BicycleService } from 'src/app/services/bicycle.service';

import { PusherService } from '../../../pusher/pusher.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  bicycleAvailable: Bicycle[] = []

  constructor(public bicycleService: BicycleService, private pusherService: PusherService) {
    this.bicycleAvailable = bicycleService.bicycles;
  }

  ngOnInit(): void {
    this.getBicycles();

    this.pusherService.subScribeToChannel('bicycles-channel', ['newBike'], (data: any) => {
      console.log("Inside Pusher Create event");
      this.getBicycles();
    });

    this.pusherService.subScribeToChannel('bicycles-channel', ['deleteBike'], (data: any) => {
      console.log("Inside Pusher Delete event");
      this.getBicycles();
    });
  }

  getBicycles(): void{
    this.bicycleService.getBicycles().subscribe(
      res => {
        this.bicycleAvailable = res
      },
      err => console.log(err)
    )
  }

}
