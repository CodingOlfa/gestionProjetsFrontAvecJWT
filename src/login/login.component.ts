import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authentification/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthRequest } from '../classes/AuthRequest';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginError:string='';


constructor(public authService: AuthService, 
            private router: Router,
          ) {}
onLogin() {
  const authRequest: AuthRequest = { 
    username: this.authService.username, 
    password: this.authService.password 
  };
  return this.authService.login(authRequest).subscribe({
    next: (response: string) => {
      localStorage.setItem('token', response); // Stockage du token
      this.authService.authenticated = true;
      const decodedToken: any = jwtDecode(response);
      this.authService.roles = decodedToken.roles; // récupérer les roles à partir du token
      this.router.navigate(['/principal']); // Redirection après la connexion
    },
    error: (err) => {
      this.authService.authenticated = false;
      this.loginError="Bad credentials";
      console.error('Erreur de connexion', err);
    }
  });
}




}


