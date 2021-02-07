import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import { Customer } from '../models/Customer';
import { LoginDetails } from '../models/LoginDetails';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private BASE_URL = 'http://localhost:8080/admin';

  constructor(private httpClient: HttpClient) { }

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.email + '/' + loginDetails.password, null);
  }

  public getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.BASE_URL + '/all-customers');
  }

  public getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.BASE_URL + '/all-companies');
  }

  public deleteCompany(companyId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-company/' + companyId, { withCredentials: true });
  }

  public deleteCustomer(customerId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-customer/' + customerId, { withCredentials: true });
  }

  public updateCompany(company: Company): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/update-company', company, { withCredentials: true });
  }

  public updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/update-customer', customer, { withCredentials: true });
  }

  public addCompany(company: Company): Observable<any> {
    const comp = { name: company.name, email: company.email, password: company.password };
    return this.httpClient.post<any>(this.BASE_URL + '/add-company', comp, { withCredentials: true });
  }

  public addCustomer(customer: Customer): Observable<any> {
    const cust = { customerId: customer.id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email, password: customer.password };
    return this.httpClient.post<any>(this.BASE_URL + '/add-customer', cust, { withCredentials: true });
  }

  public logout(token: string):Observable<any>{
    return this.httpClient.delete<any>(this.BASE_URL + '/logout/' + token, { withCredentials: true });
    }
    
}
