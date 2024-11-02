import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../../classes/Departement';
import { catchError, Observable, throwError } from 'rxjs';
import { Projet } from '../../classes/projet';
import { AuthService } from '../authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = '/api/departements';
  //Injection de HttpClient
  constructor(private http: HttpClient, private authService:AuthService) { }

  //méthode qui appelle l'api pour lister les départements
  getDepartements(): Observable<Departement[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Departement[]>(this.apiUrl,{headers});
  }

  //méthode qui appelle l'api pour supprimer un département
  deleteDepartement(id: number): Observable<Departement> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Departement>(this.apiUrl +"/"+ id, { headers } );
  }

  //méthode qui appelle l'api pour éditer un département
  editDepartement(departement: Departement): Observable<Departement> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Departement>(this.apiUrl,departement, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Méthode de gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.message ;
    return throwError(() => new Error(errorMessage));
  }

  //méthode qui appelle l'api pour lister les projets d'un département
  getProjetsForDept(id:number): Observable<Projet[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Projet[]>(this.apiUrl+"/" +id+"/projets",{ headers });
  }

  //méthode qui appelle l'api pour ajouter un département
  addDepartement(departement: any): Observable<Departement> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Departement>(this.apiUrl,departement,{ headers }).pipe(
      catchError(this.handleError)
    );
  }

  //méthode qui appelle l'api pour ajouter un département
  searchDepartements(key: any): Observable<Departement[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Departement[]>(this.apiUrl+"/recherche?keyword=" + key,{ headers });
  }
  
}//fin
