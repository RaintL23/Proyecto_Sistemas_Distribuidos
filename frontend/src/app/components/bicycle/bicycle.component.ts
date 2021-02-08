import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bicycle } from 'src/app/models/bicycle';
import { BicycleService } from 'src/app/services/bicycle.service';

import { PusherService } from '../../pusher/pusher.service';

@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
  styleUrls: ['./bicycle.component.css']
})
export class BicycleComponent implements OnInit {

  bicyclesQuantity!:number;

  constructor( public bicycleService: BicycleService, private pusherService: PusherService) {
    this.bicyclesQuantity = this.bicycleService.bicyclesQuantity || 0;
  }

  async ngOnInit() {
    this.getBicycles();

    this.pusherService.subScribeToChannel('bicycles-channel', ['newBike'], (data: any) => {
      console.log("Inside Pusher Create event");
      this.bicyclesQuantity++;
      // console.log("cantidad de clientes: " + this.clientsQuantity);
      this.getBicycles();
    });

    this.pusherService.subScribeToChannel('bicycles-channel', ['deleteBike'], (data: any) => {
      console.log("Inside Pusher Delete event");
      this.bicyclesQuantity--;
      // console.log("cantidad de clientes: " + this.clientsQuantity);
      this.getBicycles();
    });
    this.pusherService.subScribeToChannel('bicycles-channel', ['randomEvent'], (data: any) => {
      console.log("Inside Pusher Random event");
      alert('Random')
      // console.log("cantidad de clientes: " + this.clientsQuantity);
      // this.getClients();
    });
  }

  myFunction2(): void{
    this.pusherService.triggerEvent('clients-channel', 'randomEvent', {message: 'Random'})
            .subscribe( data => {
            })
  }

  countBicycles(): void{
    this.bicycleService.getBicyclesQuantity().subscribe((data:any) => {
      this.bicycleService = data.bicycleQuantity;
    })
  }

  getBicycles(): void{
    this.bicycleService.getBicycles().subscribe(
      res => {
        this.bicycleService.bicycles = res
      },
      err => console.log(err)
    )
    this.countBicycles();
  }

  addBicycle(form: NgForm):void{
    if (form.value._id){
      this.bicycleService.updateBicycle(form.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }else{
      this.bicycleService.createBicycle(form.value).subscribe(
        data => {
          this.getBicycles()
          form.reset();
        },
        err => console.log(err)
      )
    }

    this.pusherService.triggerEvent('bicycles-channel', 'newBike', form.value)
            .subscribe( data => {
              // console.log(data)
            })
  }

  resetForm(form: NgForm):void {
    form.reset;
  }

  deleteBicycle(id: string): void{
    if (confirm('Are you sure you want DELETE it?')){
      this.bicycleService.deleteBicycle(id).subscribe(
        res => {
          this.getBicycles()
        },
        err => console.log(err)
      );
    }
    this.pusherService.triggerEvent('bicycles-channel', 'deleteBike', {message: 'bicycle deleted'})
            .subscribe( data => {
              alert(data.toString());
            })
  }

  editBicycle(bicycle: Bicycle):void {
    this.bicycleService.selectedBicycle = bicycle;
  }

}
