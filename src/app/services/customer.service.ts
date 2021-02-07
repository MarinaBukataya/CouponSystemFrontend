import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';
import { Customer } from '../models/Customer';
import { LoginDetails } from '../models/LoginDetails';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private BASE_URL = 'http://localhost:8080/customer';
  constructor(private httpClient: HttpClient) { }

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.email + '/' + loginDetails.password, null);
  }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/all-customer-coupons', { withCredentials: true });
  }

  public getCouponsByPrice(price: number): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/customer-coupons-by-price/' + price, { withCredentials: true });
  }

  public purchaseCoupon(coupon: Coupon): Observable<any> {
    const coup = {
      id: coupon.id, companyId: coupon.companyId, category: coupon.category, title: coupon.title, description: coupon.description,
      startDate: coupon.startDate, endDate: coupon.endDate, amount: coupon.amount, price: coupon.price, image: coupon.image
    };
    return this.httpClient.post<Coupon>(this.BASE_URL + '/purchase-coupon', coup, { withCredentials: true });
  }

  public getCouponsByCategory(category: string): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/customer-coupons-by-category/' + category, { withCredentials: true });
  }

  public getCouponsCatalogue(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/all-coupons', { withCredentials: true });
  }

  public getCustomerDetails(): Observable<Customer> {
    return this.httpClient.get<Customer>(this.BASE_URL + '/customer-details', { withCredentials: true });
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/logout/' + token, { withCredentials: true });
  }
}
