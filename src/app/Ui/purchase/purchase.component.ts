import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchases } from 'src/app/shared/services/interfaces/purchase';
import { HttpDbService } from 'src/app/shared/services/http-db.service';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private httpDBService: HttpDbService, private router: Router) { }
  purchases!: Purchases[];
  purchase!: Purchases;

  ngOnInit(): void {
    this.getPurchases();
  }
  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'item', id]);
    } else {
      this.router.navigate([this.router.url, 'item']);
    }
  }

  async getPurchases() {
    try {
      this.purchases = await this.httpDBService.getPurchases();
    } catch (err) {
      console.error(err);
    }
    
  }
  async onDeletePurchase(index: number) {
    try {
      await this.httpDBService.deletePurchases(index);
    } catch (err) {
      console.error(err);
    }
    this.getPurchases();
  }
  async changeStatus(index: number) {
    try {
      this.purchase = await this.httpDBService.getPurchase(index);

      if (this.purchase.status == "Не куплено") {
        let purchase: Purchases = {
          name: this.purchase.name,
          amount: this.purchase.amount,
          status: "Куплено",
          bought: true
        }
        await this.httpDBService.editPurchases(index,purchase)
      }
      else {
        let purchase: Purchases = {
          name: this.purchase.name,
          amount: this.purchase.amount,
          status: "Не куплено",
          bought: false
        }
        await this.httpDBService.editPurchases(index,purchase)
      }
      this.getPurchases();
    } catch (error) {
      console.log(error);
      return;
    }
  }

  

}
