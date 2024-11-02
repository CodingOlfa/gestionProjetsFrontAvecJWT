import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../classes/AuthRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/users';  
  username: string='';
  password: string='';
  authenticated:boolean=false;
  roles : string[]=[];

  constructor(private http: HttpClient) { }

  login(authRequest: AuthRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, authRequest, { responseType: 'text' });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  hasRole(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.roles.includes(role));
  }
}
