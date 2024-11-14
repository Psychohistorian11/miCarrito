import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { Product, ProductResponse } from '../../../auth/interfaces/product.interface';
import { ProductAdminComponent } from '@products/components/product-admin/product-admin.component';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [ProductAdminComponent, NgFor],
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent {

  name: string = ''
  products = signal<ProductResponse[]>([]);


  constructor(private route: ActivatedRoute,
              private productAPIservice: ProductAPIService
  ){
      this.route.params.subscribe({
        next: (response) => {
          this.name = response['name']
          this.getProductByName(this.name)
        }
      })
  }

  private getProductByName(name: string) {
    this.productAPIservice.getProductbyName(name).subscribe({
      next: (response: ProductResponse[]) => {
        if (response && response.length > 0) {
          this.products.set(response);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Product not found',
            text: 'Please verify the name',
            confirmButtonText: 'OK'
          });
          console.log("No se encontraron productos con el nombre:", name);
        }
      },
      error: (err) => {
        console.error("Error al buscar producto:", err);
      }
    });
  }

}
