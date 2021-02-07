import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Coupon } from 'src/app/models/Coupon';
import { Customer } from 'src/app/models/Customer';
import { AlertService } from 'src/app/services/alert.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-facade',
  templateUrl: './customer-facade.component.html',
  styleUrls: ['./customer-facade.component.scss']
})
export class CustomerFacadeComponent implements OnInit {
  coupons: Coupon[];
  category: Category;
  coupon: Coupon;
  customer: Customer;
  constructor(private customerService: CustomerService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.customerService.getAllCoupons().subscribe(
      (res) => { this.coupons = res }, (err) => { alert(err.error) });

    this.customerService.getCustomerDetails().subscribe(
      (res) => { this.customer = res }, (err) => { alert(err.error) });
  }
  onChangeCategory(value: string): void {
    if (value === 'ALL') {
      this.customerService.getAllCoupons().subscribe(
        (res) => { this.coupons = res }, (err) => { alert(err.error) });
    } else {
      this.customerService.getCouponsByCategory(value)
        .subscribe(
          coupons => {
            this.coupons = coupons;
          },
          err => {
            this.alertService.error(err.error);
          });
    }
  }

  onChangePrice(value: number): void {
    if (value.toString() === '') {
      this.customerService.getAllCoupons().subscribe(
        (res) => { this.coupons = res }, (err) => { alert(err.error) });
    } else {
      this.customerService.getCouponsByPrice(value)
        .subscribe(
          coupons => {
            this.coupons = coupons;
          },
          err => {
            this.alertService.error(err.error);
          });
    }
  }
}
