import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/Customer';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { CustomerCreateUpdateDialogComponent } from '../customer-create-update-dialog/customer-create-update-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public customers: Customer[];
  public resultDialog: Customer;
  public customerId: number;
  constructor(public dialog: MatDialog, private adminService: AdminService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.adminService.getAllCustomers().subscribe(
      (res) => { this.customers = res }, (err) => { this.alertService.error(err.error); });
  }

  public deleteCustomer(customerId: number): void {
    this.adminService.deleteCustomer(customerId).subscribe(
      () => { this.customers = this.customers.filter(item => item.id !== customerId); },
      (err) => { this.alertService.error(err.error); });
  }

  public addCustomer(): void {
    this.openDialog(null);
  }

  public updateCustomer(customer: Customer): void {
    this.openDialog(customer);
  }

  public openDialog(customer: Customer): void {

    let type: string;
    if (customer) {
      type = 'Update';
    } else {
      type = 'Create';
    }

    const dialogRef = this.dialog.open(CustomerCreateUpdateDialogComponent, {
      width: '300px',
      data: { customer, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('*', result, '*');
      this.resultDialog = result;


      if (type === 'Update') {
        this.adminService.updateCustomer(this.resultDialog).subscribe(
          (res) => {
            const toUpdate = this.customers.find(item => item.id === res.id);
            const idx = this.customers.indexOf(toUpdate);
            this.customers[idx] = res;
            console.log(toUpdate);
          },
          (err) => { this.alertService.error(err.error); }
        );
      } else {
        console.log(result);
        this.adminService.addCustomer(this.resultDialog).subscribe(
          (res) => { this.customers.push(res); },
          (err) => { this.alertService.error(err.error); }
        );
      }
    });
  }
}
