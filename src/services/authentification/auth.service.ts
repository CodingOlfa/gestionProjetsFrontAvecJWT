import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/users';
  username: string='';
  password: string='';
  authenticated:boolean=false;
  roles : string[]=[];

  constructor(private http: HttpClient) { }
  login(username: any, password: any): Observable<any> {
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get(`${this.baseUrl}/login`, { headers });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  hasRole(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.roles.includes(role));
  }
}
