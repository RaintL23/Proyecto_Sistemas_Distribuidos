import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  URL_API = 'http://Localhost:4000/api/clients';

  selectedClient: Client = {
    name: '',
    email: '',
    phone: '',
    age: 0,
    sex: '',
    // _id: ''
  };
  clients: Client[] = [];
  clientsQuantity: number = 0;

  constructor(private http: HttpClient) { }

  getClients(){
    return this.http.get<Client[]>(this.URL_API);
  }

  createClient(client: Client){
    return this.http.post(this.URL_API, client);
  }

  updateClient(client: Client){
    return this.http.put(`${this.URL_API}/${client._id}`,client);
  }

  deleteClient(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getClientsQuantity(){
    return this.http.get(this.URL_API + 'count')
  }

}
