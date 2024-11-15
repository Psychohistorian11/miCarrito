import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../auth/interfaces/product.interface';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { NgFor } from '@angular/common';
import { ProductAdminComponent } from '@products/components/product-admin/product-admin.component';
import Swal from 'sweetalert2';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ProductAdminComponent, NgFor, LoadingComponent],
  templateUrl: './all-products.component.html'
})
export class AllProductsComponent implements OnInit{

  products = signal<Product[]>([]);
  isLoading: boolean = false

  productAPIservice = inject(ProductAPIService)

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(){
    this.isLoading = true;
    this.productAPIservice.getAllProducts().subscribe({
      next: (response: Product[]) => {
        if(response){
          this.products.set(response);
        }
        this.isLoading = false; 
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Products not found',
          text: 'Please verify the ID',
          confirmButtonText: 'OK'
        });
        console.error("Error al buscar producto:", err);
      }
    });
  }
}
