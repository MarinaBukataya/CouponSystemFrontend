import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { AlertService } from 'src/app/services/alert.service';  

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  coupons: Coupon[];
  coupon: Coupon;

  constructor(private customerService: CustomerService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.customerService.getCouponsCatalogue().subscribe(
      (res) => { this.coupons = res }, (err) => { this.alertService.error(err.error); });
  }
  public purchaseCoupon(coupon) {
    this.customerService.purchaseCoupon(coupon).subscribe(
      () => {
        const couponA: Coupon = this.coupons.find(coup => coup.title === coupon.title);
        couponA.amount = couponA.amount - 1;
      },
      (err) => { this.alertService.error(err.error); })
  }
}
