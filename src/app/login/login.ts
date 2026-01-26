import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isLoading = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password).subscribe(
        (response: any) => {
          this.isLoading.set(false);
          
          // Check for backend errors in the response
          const hasErrors = response.errors && response.errors.some((error: any) => error !== null);
          
          if (hasErrors) {
            // Backend returned errors
            const errorMessage = response.errors.find((error: any) => error !== null) || 'Login failed. Please try again.';
            console.error('Login error:', errorMessage);
            this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
            return;
          }
          
          // Check if data exists
          if (!response.data || !response.data.userDTO) {
            console.error('No user data in response');
            this.snackBar.open('Login failed. Invalid response from server.', 'Close', { duration: 3000 });
            return;
          }

          console.log('Login successful:', response);
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          
          // Store token and user data
          if (response.data?.token) {
            localStorage.setItem('authToken', response.data.token);
          }
          
          // Store user data
          if (response.data?.userDTO) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }

          // Redirect based on user role
          const role = response.data?.userDTO?.role;
          let redirectPath = '/home';
          
          if (role === 'COMPANY_ADMIN') {
            redirectPath = '/dashboard/company-admin';
          } else if (role === 'COMMUNITY_ADMIN') {
            redirectPath = '/dashboard/community-admin';
          } else if (role === 'RESIDENT') {
            redirectPath = '/dashboard/resident';
          }
          
          this.router.navigate([redirectPath]);
        },
        (error: any) => {
          this.isLoading.set(false);
          console.error('HTTP error:', error);
          console.log('isLoading set to false in error handler');
          
          // Try to get error message from response
          let errorMessage = 'Login failed. Please try again.';
          
          if (error.error?.errors && error.error.errors.some((e: any) => e !== null)) {
            errorMessage = error.error.errors.find((e: any) => e !== null);
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.statusText) {
            errorMessage = error.statusText;
          }
          
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        }
      );
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
