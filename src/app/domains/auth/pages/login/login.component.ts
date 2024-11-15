import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAPIService } from '../../../../API/fastapi/user-api.service';
import { Login, UserResponse } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading: boolean = false; 

    constructor(private fb: FormBuilder,
                private userAPIservice: UserAPIService,
                private router: Router,
                private authService: AuthService,
                private userService: UserService
    ) {
    this.loginForm = this.fb.group({
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });
    }

    onSubmit() {
      if (this.loginForm.valid) {
        const data: Login = this.loginForm.value;
        this.isLoading = true;
        
        this.userAPIservice.login(data).subscribe({
          next: (response: UserResponse) => {
            if (response) {

              this.userService.setUser(response)
              if (response.itsadmin) {
                this.router.navigate(['/administrator']); 
              } else {
                this.router.navigate(['/']);
              }
              
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Incorrect credentials',
                text: 'Please verify your username and password.',
                confirmButtonText: 'OK'
              });
            }
            this.isLoading = false;
          },
          error: (error) => {
            console.log("Error to call API: ", error);
            Swal.fire({
              icon: 'error',
              title: 'Incorrect credentials',
              text: 'Please verify your username and password.',
              confirmButtonText: 'OK'
            });
          }
        });
        
      } else {
        this.loginForm.markAllAsTouched();
      }
    }
  
    getErrorMessage(controlName: string): string {
      const control = this.loginForm.get(controlName);
      if (control?.hasError('required')) {
        return 'This field is required';
      } else if (control?.hasError('email')) {
        return 'Please enter a valid email address';
      } 
      return '';
    }
}
