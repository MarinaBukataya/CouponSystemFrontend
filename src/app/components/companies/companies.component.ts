import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/models/Company';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyCreateUpdateDialogComponent } from '../company-create-update-dialog/company-create-update-dialog.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public companies: Company[];
  public resultDialog: Company;
  
  constructor(public dialog: MatDialog, private adminService: AdminService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.adminService.getAllCompanies().subscribe(
      (res) => { this.companies = res }, (err) => { this.alertService.error(err.error); });
  }
  public deleteCompany(companyId: number): void {
    this.adminService.deleteCompany(companyId).subscribe(
      () => { this.companies = this.companies.filter(item => item.id !== companyId); },
      (err) => { this.alertService.error(err.error); });
  }

  public addCompany(): void {
    this.openDialog(null);
  }

  public updateCompany(company: Company): void {
    this.openDialog(company);
  }

  public openDialog(company: Company): void {
    let type: string;
    if (company) {
      type = 'Update';
    } else {
      type = 'Create';
    }


    const dialogRef = this.dialog.open(CompanyCreateUpdateDialogComponent, {
      width: '300px',
      data: { company, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('*', result, '*');
      this.resultDialog = result;


      if (type === 'Update') {
        this.adminService.updateCompany(this.resultDialog).subscribe(
          (res) => {
            const toUpdate = this.companies.find(item => item.id === res.id);
            const idx = this.companies.indexOf(toUpdate);
            this.companies[idx] = res;
          },
          (err) => { this.alertService.error(err.error); }
        );
      } else {
        this.adminService.addCompany(this.resultDialog).subscribe(
          (res) => { this.companies.push(res); },
          (err) => { this.alertService.error(err.error); }
          // (err) => { alert(err.error); console.log(err)}
        );
      }
    });
  }
}
