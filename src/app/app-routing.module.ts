import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFacadeComponent } from './components/admin-facade/admin-facade.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyFacadeComponent } from './components/company-facade/company-facade.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { CustomerFacadeComponent } from './components/customer-facade/customer-facade.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminFacadeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'company', component: CompanyFacadeComponent },
  { path: 'customer', component: CustomerFacadeComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
