import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../API/supabase/supabase.service';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import Swal from 'sweetalert2';
import { Product } from '../../../auth/interfaces/product.interface';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, LoadingComponent],
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent {

  createForm: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  imageFromSupabase: string = ''
  isLoading: boolean = false

  constructor(private fb: FormBuilder,
              private supabaseService: SupabaseService,
              private productAPIservice: ProductAPIService
  ) {

    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      discount: ['', [Validators.min(0), Validators.max(100)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });

  }

  async onImageSelected(event: Event): Promise<void> {
    this.isLoading = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log("File: ", file);

      this.imageFromSupabase = await this.supabaseService.addImageProductSupabase(file)

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.isLoading = false;

  }
  

  onSubmit(): void {

    if (this.createForm.valid) {
      this.isLoading = true;

      const data = {
        ...this.createForm.value,
        image: this.imageFromSupabase
      };

      this.productAPIservice.createProduct(data).subscribe({
        next: (response: Product) => {
          if(response){
            Swal.fire({
              icon: 'success',
              title: 'successfully created product',
              confirmButtonText: 'OK'
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Incorrect credentials',
              text: 'Please verify your username and password.',
              confirmButtonText: 'OK'
            });
          }
          this.isLoading = false;

        }
      })

      
    }
  }
}
