import { Component, OnInit } from '@angular/core';
import { Bicycle } from 'src/app/models/bicycle';
import { Client } from 'src/app/models/client';
import { Seller } from 'src/app/models/seller';
import { BicycleService } from 'src/app/services/bicycle.service';
import { SellerService } from 'src/app/services/seller.service';

import { PusherService } from '../../../pusher/pusher.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  myProfile: Client = {
    name: '',
    email: '',
    phone: '',
    age: 0,
    sex: '',
  };
  bicycleAvailable: Bicycle[] = [];
  selectedSeller: Seller = {
    name: '',
    email: '',
    phone: '',
    age: 0,
    sex: '',
    reputation: '',
  }
  showingSeller: boolean = false;

  myBicycles: Bicycle[] = [];

  constructor(public bicycleService: BicycleService, public sellerService: SellerService, private pusherService: PusherService) {
    this.bicycleAvailable = bicycleService.bicycles;
  }

  ngOnInit(): void {
    this.getBicycles();

    this.pusherService.subScribeToChannel('clients-channel', ['newBike'], (data: any) => {
      console.log("Inside Pusher Create event");
      this.getBicycles();
    });
    this.pusherService.subScribeToChannel('clients-channel', ['reportSeller'], (data: any) => {
      console.log("Inside Pusher Report event");
      alert("El vendedor " +this.selectedSeller.name+ " ha sido reportado")
    });
    this.pusherService.subScribeToChannel('clients-channel', ['buyBike'], (data: any) => {
      console.log("Inside Pusher Buy event");
      this.getBicycles();
    });
    this.pusherService.subScribeToChannel('clients-channel', ['refundBike'], (data: any) => {
      console.log("Inside Pusher Buy event");
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

  searchSeller(sellerId: string): void{

    this.sellerService.getSeller(sellerId).subscribe(
      res => {
        this.selectedSeller = res
        // console.log(this.selectedSeller);
      },
      err => console.log(err)
    )
      this.showingSeller = true;

  }

  cancelSellerInfo(){
    this.showingSeller = false;
  }

  reportSeller(){
    this.pusherService.triggerEvent('clients-channel', 'reportSeller', {message: 'Tengan Cuidado con este Vendedor'})
            .subscribe( data => {
              // console.log(data)
            })
  }

  followSeller(){
    this.pusherService.subScribeToChannel(`${this.selectedSeller.name}-seller-channel`, ['followerEvent'], (data: any) => {
      console.log("Inside Pusher Follower event");
      alert("El vendedor " +this.selectedSeller.name+ " ha sido reportado")
    });
  }

  buyBicycle(bikeId: string){
    this.bicycleService.getBicycle(bikeId).subscribe(
      res => {
        // console.log(res);
        this.myBicycles.push(res)
      },
      err => console.log(err)
    )
    this.bicycleService.deleteBicycle(bikeId).subscribe(
      res => {
        this.getBicycles();
      },
      err => console.log(err)
    );
    this.pusherService.triggerEvent('clients-channel', 'buyBike', {message: 'Una bicicleta fue comprada, es hora de actualizar'})
            .subscribe( data => {
              // console.log(data)
            })
  }

  refundBicycle(bikeId: string){

    let refundBike = this.myBicycles.find(function(bike) {
      return bike._id === bikeId;
    });
    this.myBicycles = this.myBicycles.filter(item => item !== refundBike);
    console.log(refundBike);
    this.bicycleService.createBicycle(refundBike!).subscribe(
      data => {
        this.getBicycles()
      },
      err => console.log(err)
    )
    this.pusherService.triggerEvent('clients-channel', 'refundBike', {message: 'Una bicicleta ha sido devuelta, es hora de actualizar'})
            .subscribe( data => {
              // console.log(data)
            })
  }

}
