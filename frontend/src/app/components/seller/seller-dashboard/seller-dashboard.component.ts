import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/models/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  sellerSelected!: Seller;
  sellersList: Seller[] = [];

  constructor(public sellerService: SellerService) { }

  ngOnInit(): void {
    this.getSellers();
  }

  getSellers(): void{
    this.sellerService.getSellers().subscribe(
      res => {
        this.sellerService.sellers = res;
        this.sellersList = res;
        this.sellerSelected = this.sellersList[0];
        //console.log(res)
      },
      err => console.log(err)
    )
  }

}
