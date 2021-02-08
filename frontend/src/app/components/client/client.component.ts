import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { NgForm } from '@angular/forms';

import { PusherService } from '../../pusher/pusher.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client1: any;
  clientsQuantity!: number;

  constructor(public clientService: ClientService, private pusherService: PusherService) {
    this.clientsQuantity = this.clientService.clientsQuantity || 0;
  }

  async ngOnInit() {
    this.getClients();

    this.pusherService.subScribeToChannel('clients-channel', ['newSub'], (data: any) => {
      console.log("Inside Pusher Create event");
      this.clientsQuantity = this.clientsQuantity + 1;
      // console.log("cantidad de clientes: " + this.clientsQuantity);
      this.getClients();
    });

    this.pusherService.subScribeToChannel('clients-channel', ['deleteSub'], (data: any) => {
      console.log("Inside Pusher Delete event");
      this.clientsQuantity = this.clientsQuantity + 1;
      // console.log("cantidad de clientes: " + this.clientsQuantity);
      this.getClients();
    });
    this.pusherService.subScribeToChannel('clients-channel', ['randomEvent'], (data: any) => {
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

  resetForm(form: NgForm):void {
    // console.log('hello');
    form.reset;
  }

  addClient(form: NgForm){
    if (form.value._id){
      this.clientService.updateClient(form.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }else{
      this.clientService.createClient(form.value).subscribe(
        data => {
          this.getClients()
          form.reset();
        },
        err => console.log(err)
      )
    }

    this.pusherService.triggerEvent('clients-channel', 'newSub', form.value)
            .subscribe( data => {
              // console.log(data)
            })
  }

  getClients(): void{
    this.clientService.getClients().subscribe(
      res => {
        this.clientService.clients = res
        //console.log(res)
      },
      err => console.log(err)
    )
    this.countClients();
  }

  countClients(): void{
    this.clientService.getClientsQuantity().subscribe((data:any) => {
      // console.log("Inside getClientsQuantity Subscribe Method", data);
      this.clientsQuantity = data.clientQuantity;
      // console.log("ClientQuantity 1", this.clientsQuantity);
    })
  }

  deleteClient(id: string): void{
    if (confirm('Are you sure you want DELETE it?')){
      this.clientService.deleteClient(id).subscribe(
        res => {
          this.getClients()
        },
        err => console.log(err)
      );
    }
    this.pusherService.triggerEvent('clients-channel', 'deleteSub', {message: 'client deleted'})
            .subscribe( data => {
              alert(data.toString());
            })
  }

  editClient(client: Client):void {
    this.clientService.selectedClient = client;
  }


}
