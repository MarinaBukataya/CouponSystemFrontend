import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/models/Company';
import { Coupon } from 'src/app/models/Coupon';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { CouponCreateUpdateDialogComponent } from '../coupon-create-update-dialog/coupon-create-update-dialog.component';

@Component({
  selector: 'app-company-facade',
  templateUrl: './company-facade.component.html',
  styleUrls: ['./company-facade.component.scss']
})
export class CompanyFacadeComponent implements OnInit {

  public coupons: Coupon[];
  public resultDialog: Coupon;

  constructor(public dialog: MatDialog, private companyService: CompanyService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.companyService.getAllCoupons().subscribe(
      (res) => { this.coupons = res }, (err) => { alert(err.error) });

  }

  public deleteCoupon(couponId: number): void {
    this.companyService.deleteCoupon(couponId).subscribe(
      () => { this.coupons = this.coupons.filter(item => item.id !== couponId); },
      (err) => { this.alertService.error(err.error); });
  }

  public addCoupon(): void {
    this.openDialog(null);
  }

  public updateCoupon(coupon: Coupon): void {
    this.openDialog(coupon);
  }

  public openDialog(coupon: Coupon): void {
    let type: string;

    if (coupon) {
      type = 'Update';

    } else {
      type = 'Create';
    }
    const dialogRef = this.dialog.open(CouponCreateUpdateDialogComponent, {
      width: '300px',
      data: { coupon, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('*', result, '*');
      this.resultDialog = result;
      if (this.resultDialog.companyId == 0 || this.resultDialog.title == '' || this.resultDialog.description == '' || this.resultDialog.amount < 0 || this.resultDialog.price <= 0 || this.resultDialog.image == '')
        {
          return;
        }

      if (type === 'Update') {
        this.companyService.updateCoupon(this.resultDialog).subscribe(
          (res) => {
            const toUpdate = this.coupons.find(item => item.id === res.id);
            const idx = this.coupons.indexOf(toUpdate);
            this.coupons[idx] = res;
          },
          (err) => { this.alertService.error(err.error); }
        );
      } else {
        console.log(result);
        this.companyService.addCoupon(this.resultDialog).subscribe(
          (res) => { this.coupons.push(res); },
          (err) => { this.alertService.error(err.error); }
          // (err) => { alert(err.message); }
        );
      }
    });
  }

  onChangeCategory(value: string): void {
    if (value === 'ALL') {
      this.companyService.getAllCoupons().subscribe(
        (res) => { this.coupons = res }, (err) => { alert(err.error) });
    } else {
      this.companyService.getCouponsByCategory(value)
        .subscribe(
          coupons => {
            this.coupons = coupons;
          },
          error => {
            console.log(error);
          });
    }
  }

  onChangePrice(value: number): void {
    if (value.toString() === '') {
      this.companyService.getAllCoupons().subscribe(
        (res) => { this.coupons = res }, (err) => { alert(err.error) });
    } else {
      this.companyService.getCouponsByPrice(value)
        .subscribe(
          coupons => {
            this.coupons = coupons;
          },
          error => {
            console.log(error);
          });
    }
  }


}
