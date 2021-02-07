import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/Customer';

export interface DialogData {
  customer: Customer;
  type: string;
}

@Component({
  selector: 'app-customer-create-update-dialog',
  templateUrl: './customer-create-update-dialog.component.html',
  styleUrls: ['./customer-create-update-dialog.component.scss']
})
export class CustomerCreateUpdateDialogComponent implements OnInit {
  type: string;
  customer = new Customer();
  origin = new Customer();
  constructor(public dialogRef: MatDialogRef<CustomerCreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.smartCopy(data.customer);
    this.type = data.type;
  }

  ngOnInit(): void {
  }

  public smartCopy(customer: Customer): void {
    if (customer) {
      this.customer.id = customer.id;
      this.customer.firstName = customer.firstName;
      this.customer.lastName = customer.lastName;
      this.customer.email = customer.email;
      this.customer.password = customer.password;

      this.origin.id = customer.id;
      this.origin.firstName = customer.firstName;
      this.origin.lastName = customer.lastName;
      this.origin.email = customer.email
      this.origin.password = customer.password;

    } else {
      this.customer.id = 0;
      this.customer.lastName = '';
      this.customer.firstName = '';
      this.customer.email = '';
      this.customer.password = '';
    }
  }

  public checkChanges(origin: Customer, customer: Customer): boolean {
    return JSON.stringify(origin) === JSON.stringify(customer);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
