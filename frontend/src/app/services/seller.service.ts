import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seller } from '../models/seller';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  URL_API = 'http://Localhost:4000/api/sellers';

  selectedSeller: Seller = {
    name: '',
    email: '',
    phone: '',
    age: 0,
    sex: '',
    reputation: '',
  }

  sellers: Seller[] = [];
  sellersQuantity: number = 0;

  constructor(private http: HttpClient) { }

  getSellers(){
    return this.http.get<Seller[]>(this.URL_API);
  }

  createSeller(seller: Seller){
    return this.http.post(this.URL_API, seller);
  }

  updateSeller(seller: Seller){
    return this.http.put(`${this.URL_API}/${seller._id}`,seller);
  }

  deleteSeller(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getSellersQuantity(){
    return this.http.get(this.URL_API + 'count')
  }

}
