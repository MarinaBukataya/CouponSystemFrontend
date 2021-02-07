import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';

export interface DialogData {
  company: Company;
  type: string;
}

@Component({
  selector: 'app-company-create-update-dialog',
  templateUrl: './company-create-update-dialog.component.html',
  styleUrls: ['./company-create-update-dialog.component.scss']
})
export class CompanyCreateUpdateDialogComponent implements OnInit {

  type: string;
  company = new Company();
  origin = new Company();


  constructor(public dialogRef: MatDialogRef<CompanyCreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.smartCopy(data.company);
    this.type = data.type;
  }
  ngOnInit(): void {
   
  }

  public smartCopy(company: Company): void {
    if (company) {
      this.company.id = company.id;
      this.company.name = company.name;
      this.company.email = company.email;
      this.company.password = company.password;

      this.origin.id = company.id;
      this.origin.name = company.name;
      this.origin.email = company.email;
      this.origin.password = company.password;
    } else {

      this.company.id = 0;
      this.company.name = '';
      this.company.email = '';
      this.company.password = '';
    }
  }

  public checkChanges(origin: Company, company: Company): boolean {
    return JSON.stringify(origin) === JSON.stringify(company);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
