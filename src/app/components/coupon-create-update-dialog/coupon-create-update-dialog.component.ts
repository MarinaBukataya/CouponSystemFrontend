import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';
import { Company } from 'src/app/models/Company';
import { Coupon } from 'src/app/models/Coupon';
import { CompanyService } from 'src/app/services/company.service';

export interface DialogData {
  coupon: Coupon;
  type: string;

}

@Component({
  selector: 'app-coupon-create-update-dialog',
  templateUrl: './coupon-create-update-dialog.component.html',
  styleUrls: ['./coupon-create-update-dialog.component.scss']
})
export class CouponCreateUpdateDialogComponent implements OnInit {
  type: string;
  coupon = new Coupon();
  origin = new Coupon();
  tmpCoupon = new Coupon();
  company: Company;

  companyId: number;
  todayDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<CouponCreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private companyService: CompanyService) {

    this.tmpCoupon = data.coupon;
    this.type = data.type;

  }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(companyServer => { this.company = companyServer; console.log(this.company); this.companyId = this.company.id; this.smartCopy(this.tmpCoupon); }, (err) => { alert(err.error) });
   
  }

  public smartCopy(coupon: Coupon): void {
    if (coupon) {
      this.coupon.id = coupon.id;
      this.coupon.companyId = coupon.companyId;
      this.coupon.category = coupon.category;
      this.coupon.title = coupon.title;
      this.coupon.description = coupon.description;
      this.coupon.startDate = coupon.startDate;
      this.coupon.endDate = coupon.endDate;
      this.coupon.amount = coupon.amount;
      this.coupon.price = coupon.price;
      this.coupon.image = coupon.image;

      this.origin.id = coupon.id;
      this.origin.companyId = coupon.companyId;
      this.origin.category = coupon.category;
      this.origin.title = coupon.title;
      this.origin.description = coupon.description;
      this.origin.startDate = new Date(coupon.startDate);
      this.origin.endDate = new Date(coupon.endDate);
      this.origin.amount = coupon.amount;
      this.origin.price = coupon.price;
      this.origin.image = coupon.image;

    } else {

      this.coupon.id = 0;
      this.coupon.companyId = this.companyId;
      this.coupon.category = Category.ELECTRICITY;
      this.coupon.title = '';
      this.coupon.description = '';
      this.coupon.startDate = new Date();
      this.coupon.endDate = new Date();
      this.coupon.amount = 0;
      this.coupon.price = 0;
      this.coupon.image = '';
    }
  }

  public checkChanges(origin: Coupon, coupon: Coupon): boolean {
    return JSON.stringify(origin) === JSON.stringify(coupon);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  inputEventStart(event) {
    console.log(event.value);
    this.coupon.startDate = new Date(event.value);
  }

  changeEventStart(event) {
    console.log(event.value);
    this.coupon.startDate = new Date(event.value);
  }

  inputEventEnd(event) {
    console.log(event.value);
    this.coupon.endDate = new Date(event.value);
  }

  changeEventEnd(event) {
    console.log(event.value);
    this.coupon.endDate = new Date(event.value);
  }

}
