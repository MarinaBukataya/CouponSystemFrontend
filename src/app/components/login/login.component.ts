import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/models/LoginDetails';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails = new LoginDetails();
  public isUserLoggedIn: number;

  constructor(private router: Router, private authorizationService: AuthorizationService, private adminService: AdminService, private companyService: CompanyService, private customerService: CustomerService, private logoutService: LogoutService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.logoutService.count.subscribe(c => {
      this.isUserLoggedIn = c;
    });
  }

  RouteOnClick() {
    if (this.loginDetails.type === 'admin') {
      this.adminService.login(this.loginDetails).subscribe(
        (loginRes) => {
          let loginResponse: LoginResponse;
          loginResponse = loginRes;
          const myToken = loginResponse.token;
          console.log(myToken);
          this.logoutService.nextCount(3);
          this.authorizationService.setToken(myToken);
          this.router.navigateByUrl('/admin');
        },
        (err) => { this.alertService.error(err.error); }
      );

    } else if (this.loginDetails.type === 'company') {
      this.companyService.login(this.loginDetails).subscribe(
        (loginRes) => {
          let loginResponse: LoginResponse;
          loginResponse = loginRes;
          const myToken = loginResponse.token;
          this.logoutService.nextCount(4);
          this.authorizationService.setToken(myToken);
          this.router.navigateByUrl('/company');
        },
        (err) => { this.alertService.error(err.error); }
      );

    } else {
      this.customerService.login(this.loginDetails).subscribe(
        (loginRes) => {
          let loginResponse: LoginResponse;
          loginResponse = loginRes;
          const myToken = loginResponse.token;
          this.logoutService.nextCount(5);
          this.authorizationService.setToken(myToken);
          this.router.navigateByUrl('/customer');
        },
        (err) => { this.alertService.error(err.error); }
      );
    }
  }

}
