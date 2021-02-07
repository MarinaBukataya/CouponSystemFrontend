import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AdminFacadeComponent } from './components/admin-facade/admin-facade.component';
import { CompanyFacadeComponent } from './components/company-facade/company-facade.component';
import { CustomerFacadeComponent } from './components/customer-facade/customer-facade.component';
import { AlertComponent } from './components/alert/alert.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CouponCreateUpdateDialogComponent } from './components/coupon-create-update-dialog/coupon-create-update-dialog.component';
import { CompanyCreateUpdateDialogComponent } from './components/company-create-update-dialog/company-create-update-dialog.component';
import { CustomerCreateUpdateDialogComponent } from './components/customer-create-update-dialog/customer-create-update-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Interceptor } from './interceptors/interceptor';
import { DateFormat } from './models/DateFormat';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AdminFacadeComponent,
    CompanyFacadeComponent,
    CustomerFacadeComponent,
    AlertComponent,
    CouponsComponent,
    CompaniesComponent,
    CustomersComponent,
    CouponCreateUpdateDialogComponent,
    CompanyCreateUpdateDialogComponent,
    CustomerCreateUpdateDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,


  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }, { provide: MAT_DATE_FORMATS, useValue: DateFormat }, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
