import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserLoggedIn: number = 1;

  constructor(private router: Router, private authorizationService: AuthorizationService, private adminService: AdminService, private companyService: CompanyService, private customerService: CustomerService, private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.logoutService.count.subscribe(c => {
      this.isUserLoggedIn = c;
    });
  }

  public getToken(): string {
    return this.authorizationService.getToken();
  }

  loginOnClick(event: Event): void {
    this.logoutService.nextCount(2);
  }

  logoutOnClick(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
    if (this.isUserLoggedIn === 4) {
      this.companyService.logout(this.getToken()).subscribe(
        () => { this.authorizationService.deleteToken(); console.log(this.getToken()) },
        (err) => { alert(err.message); });
    } else if (this.isUserLoggedIn === 5) {
      this.customerService.logout(this.getToken()).subscribe(
        () => { this.authorizationService.deleteToken(); console.log(this.getToken()) },
        (err) => { alert(err.message); });
    } else {
      this.adminService.logout(this.getToken()).subscribe(
        () => { this.authorizationService.deleteToken(); console.log(this.getToken()) },
        (err) => { alert(err.message); });
    }
    this.logoutService.resetCount();
  }



}
