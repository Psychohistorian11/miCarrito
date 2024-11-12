import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { heroUser, heroAcademicCap } from '@ng-icons/heroicons/outline';
import { bootstrapFacebook, bootstrapTwitterX, bootstrapInstagram } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, NgIcon],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css' ,
  providers: [provideIcons({heroUser, heroAcademicCap, bootstrapFacebook,
     bootstrapTwitterX, bootstrapInstagram}), provideNgIconsConfig({size:'1.5em'})]
})
export class SignUpComponent {
  constructor(private fb: FormBuilder) {
    // Crear el formulario reactivo con validaciones
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método que se ejecuta cuando se presiona la tecla Enter
  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, address, password } = this.signUpForm.value;
      console.log('Datos capturados:', { email, address, password });
    } else {
      alert('Todos los campos son obligatorios');
    }
  }
}
