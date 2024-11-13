import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { heroUser, heroAcademicCap } from '@ng-icons/heroicons/outline';
import { bootstrapFacebook, bootstrapTwitterX, bootstrapInstagram } from '@ng-icons/bootstrap-icons';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User, UserResponse } from '../../interfaces/user.interface';
import { UserAPIService } from '../../../../API/user-api.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, NgIcon, ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css' ,
  providers: [provideIcons({heroUser, heroAcademicCap, bootstrapFacebook,
     bootstrapTwitterX, bootstrapInstagram}), provideNgIconsConfig({size:'1.5em'})]
})
export class SignUpComponent {

  signUpForm: FormGroup; 
  isLoading: boolean = false; 

  constructor(private fb: FormBuilder,
              private userAPIservice: UserAPIService,
              private router: Router
  ) {
    this.signUpForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      itsadmin: [false]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const data: User = this.signUpForm.value;
      this.isLoading = true;

      this.userAPIservice.createUser(data).subscribe({
        next: (response: UserResponse) => {
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (error) => {
          console.log("Error to call API: ", error)
        }

        
      })
    } else {
      this.signUpForm.markAllAsTouched();
    }
    
  }

  getErrorMessage(controlName: string): string {
    const control = this.signUpForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    } else if (control?.hasError('minlength')) {
      return `Password must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
    }
    return '';
  }
  
}
