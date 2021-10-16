import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Purchases } from 'src/app/shared/services/interfaces/purchase';
import { HttpDbService } from 'src/app/shared/services/http-db.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private HttpDbService: HttpDbService, private activatedRoute: ActivatedRoute, private router: Router) { }

  purchase!: Purchases;
  purchases: Purchases[] = [];
  purchForm!: FormGroup;
  id: any;


   async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      amount: [null, [Validators.required,Validators.maxLength(100)]],
      // status: ["Не куплено",[Validators.requiredTrue]],
    };


    this.purchForm = this.fb.group(controls);

    if (this.id) {
      try {
        this.purchase = await this.HttpDbService.getPurchase(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.purchForm.patchValue(this.purchase);
    } else {
      this.purchForm.reset();
    }
  }

  getClear() {
    if(this.id)
    {
      this.getData();
    }else{
      this.purchForm.reset();
    }  
  }

  async addPurchase() {
    if (this.id) {
      const purchase: Purchases = this.purchForm.value;
      try {
        await this.HttpDbService.editPurchases(this.id, purchase);
        await this.getData();
        this.router.navigate(['/purchases']);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    else {
      const purchase = this.purchForm.value;
      purchase.status = "Не куплено";
      purchase.bought = false;
      try {
        await this.HttpDbService.postPurchases(purchase);
        this.router.navigate(['/purchases']);
      } catch (err) {
        console.error(err);
      }
    }
  }
  async onDeletePurchase() {
    try {
        await this.HttpDbService.deletePurchases(this.id);
        this.router.navigate(['/purchases']);
    } catch (err) {
      console.error(err);
    }
    this.getPurchases();
  }
  async getPurchases() {
    try {
      this.purchases = await this.HttpDbService.getPurchases();
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param.id ? +param.id : null;
      this.getData();
    });
  }

}
