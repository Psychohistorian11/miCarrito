import { NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { SupabaseService } from '../../../../API/supabase/supabase.service';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../auth/interfaces/product.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, LoadingComponent],
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent {
  editForm!: FormGroup;
  idProduct: number = 0;
  imageUrl: string | ArrayBuffer | null = null;
  imageFromSupabase: string = '';
  isLoading: boolean = false;
  product = signal<Product | null>(null);

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private productAPIservice: ProductAPIService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe({
      next: (response) => {
        this.idProduct = response['id'];
        this.loadProduct(this.idProduct);
      }
    });
  }

  loadProduct(idProduct: number) {
    this.productAPIservice.getProductbyId(idProduct).subscribe({
      next: (response) => {
        if (response) {
          this.product.set(response);
          this.imageUrl = response.image;
          this.initializeForm();
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Product not found',
          text: 'Please verify the ID',
          confirmButtonText: 'OK'
        });
        console.error("Error al buscar producto:", err);
      }
    });
  }

  initializeForm() {
    this.editForm = this.fb.group({
      name: [this.product()?.name, Validators.required],
      description: [this.product()?.description, Validators.required],
      category: [this.product()?.category,Validators.required],
      image: [this.product()?.image],
      price: [this.product()?.price, [Validators.required, Validators.min(0)]],
      discount: [this.product()?.discount, [Validators.min(0), Validators.max(100)]],
      stock: [this.product()?.stock, [Validators.required, Validators.min(0)]]
    });
  }

  async onImageSelected(event: Event): Promise<void> {
    this.isLoading = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log("File: ", file);

      this.imageFromSupabase = await this.supabaseService.addImageProductSupabase(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.isLoading = false;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.isLoading = true;

      const data = {
        ...this.editForm.value,
        image: this.imageFromSupabase || this.imageUrl,
        id: this.product()?.id
      };

      this.productAPIservice.updateProduct(data).subscribe({
        next: (response: Product) => {
          if (response) {
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Product successfully edited',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Incorrect credentials',
              text: 'Please verify.',
              confirmButtonText: 'OK'
            });
          }
          this.isLoading = false;
        }
      });
    }
  }
}
