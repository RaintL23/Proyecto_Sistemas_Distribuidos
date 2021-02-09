import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  step = 1;

  clientsList: Client[] = [];

  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
  }

  nextStep(aux: number): void{
    this.step += aux;
  }

  getClients(): void{
    this.clientService.getClients().subscribe(
      res => {
        this.clientService.clients = res;
        this.clientsList = this.clientService.clients;
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
