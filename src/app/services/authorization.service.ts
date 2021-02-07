import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  
  private token: string;

  constructor() { }

  public getToken(): string {
    
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    
  }

  public deleteToken() {
    localStorage.removeItem('token');
  }
}
