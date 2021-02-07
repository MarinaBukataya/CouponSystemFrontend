import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import { Coupon } from '../models/Coupon';
import { LoginDetails } from '../models/LoginDetails';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private BASE_URL = 'http://localhost:8080/company';

  constructor(private httpClient: HttpClient) { }

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.email + '/' + loginDetails.password, null);
  }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/all-company-coupons', { withCredentials: true });
  }

  public deleteCoupon(couponId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-coupon/' + couponId, { withCredentials: true });
  }

  public updateCoupon(coupon: Coupon): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/update-coupon', coupon, { withCredentials: true });
  }

  public addCoupon(coupon: Coupon): Observable<any> {
    const coup = {
      companyId: coupon.companyId, category: coupon.category, title: coupon.title, description: coupon.description,
      startDate: coupon.startDate, endDate: coupon.endDate, amount: coupon.amount, price: coupon.price, image: coupon.image
    };
    return this.httpClient.post<any>(this.BASE_URL + '/add-coupon', coup, { withCredentials: true });
  }

  public getCouponsByPrice(price: number): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/company-coupons-by-price/' + price, { withCredentials: true });
  }

  public getCouponsByCategory(category: string): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.BASE_URL + '/company-coupons-by-category/' + category, { withCredentials: true });
  }

  public getCompanyDetails(): Observable<Company> {
    return this.httpClient.get<Company>(this.BASE_URL + '/company-details', { withCredentials: true });
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/logout/' + token, { withCredentials: true });
  }

}
