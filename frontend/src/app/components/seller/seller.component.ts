import { Component, OnInit } from '@angular/core';
import { PusherService } from 'src/app/pusher/pusher.service';
import { SellerService } from 'src/app/services/seller.service';
import { NgForm } from '@angular/forms';
import { Seller } from 'src/app/models/seller';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  sellersQuantity!: number;

  constructor(public sellerService: SellerService, private pusherService: PusherService) {
    this.sellersQuantity = sellerService.sellersQuantity || 0;
  }

  async ngOnInit() {
    this.getSellers();

    this.pusherService.subScribeToChannel('sellers-channel', ['newSub'], (data: any) => {
      console.log("Inside Pusher Create event");
      this.sellersQuantity++;
      // console.log("cantidad de clientes: " + this.sellersQuantity);
      this.getSellers();
    });

    this.pusherService.subScribeToChannel('sellers-channel', ['deleteSub'], (data: any) => {
      console.log("Inside Pusher Delete event");
      this.sellersQuantity++;
      // console.log("cantidad de clientes: " + this.sellersQuantity);
      this.getSellers();
    });
    this.pusherService.subScribeToChannel('sellers-channel', ['randomEvent'], (data: any) => {
      console.log("Inside Pusher Random event");
      alert('Random')
      console.log("cantidad de clientes: " + this.sellersQuantity);
      // this.getClients();
    });
  }

  myFunction2(): void{
    this.pusherService.triggerEvent('sellers-channel', 'randomEvent', {message: 'Random'})
            .subscribe( data => {
            })
  }

  resetForm(form: NgForm):void {
    // console.log('hello');
    form.reset;
  }

  addSeller(form: NgForm){
    if (form.value._id){
      this.sellerService.updateSeller(form.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }else{
      this.sellerService.createSeller(form.value).subscribe(
        data => {
          this.getSellers()
          form.reset();
        },
        err => console.log(err)
      )
    }

    this.pusherService.triggerEvent('sellers-channel', 'newSub', form.value)
            .subscribe( data => {
              // console.log(data)
            })
  }

  getSellers(): void{
    this.sellerService.getSellers().subscribe(
      res => {
        this.sellerService.sellers = res
        //console.log(res)
      },
      err => console.log(err)
    )
    this.countSellers();
  }

  countSellers(): void{
    this.sellerService.getSellersQuantity().subscribe((data:any) => {
      // console.log("Inside getSellersQuantity Subscribe Method", data);
      this.sellersQuantity = data.sellerQuantity;
      // console.log("ClientQuantity 1", this.sellersQuantity);
    })
  }

  deleteSeller(id: string): void{
    if (confirm('Are you sure you want DELETE it?')){
      this.sellerService.deleteSeller(id).subscribe(
        res => {
          this.getSellers()
        },
        err => console.log(err)
      );
    }
    this.pusherService.triggerEvent('sellers-channel', 'deleteSub', {message: 'client deleted'})
            .subscribe( data => {
              alert(data.toString());
            })
  }

  editSeller(seller: Seller):void {
    this.sellerService.selectedSeller = seller;
  }
}
