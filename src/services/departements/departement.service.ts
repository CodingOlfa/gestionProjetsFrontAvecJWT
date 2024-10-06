import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../../classes/departement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'http://localhost:8080/departements';
  //Injection de HttpClient
  constructor(private http: HttpClient) { }

  //getDepartements
  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }
}
