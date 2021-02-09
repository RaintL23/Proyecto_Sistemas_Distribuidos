import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bicycle } from '../models/bicycle';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  URL_API = 'http://Localhost:4000/api/bicycles';

  selectedBicycle: Bicycle = {
    price: 0,
    model: '',
    brand: '',
    type: '',
    size: '',
    material: '',
  }

  bicycles: Bicycle[] = [];
  bicyclesQuantity: number = 0;

  constructor(private http: HttpClient) { }

  getBicycles(){
    return this.http.get<Bicycle[]>(this.URL_API);
  }

  createBicycle(bicycle: Bicycle){
    console.log(bicycle)
    return this.http.post(this.URL_API, bicycle);
  }

  updateBicycle(bicycle: Bicycle){
    return this.http.put(`${this.URL_API}/${bicycle._id}`,bicycle);
  }

  deleteBicycle(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

  getBicyclesQuantity(){
    return this.http.get(this.URL_API + 'count')
  }

}
