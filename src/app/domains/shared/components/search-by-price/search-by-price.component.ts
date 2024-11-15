import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import Swal from 'sweetalert2';
import { ProductAdminComponent } from '@products/components/product-admin/product-admin.component';
import { NgFor } from '@angular/common';
import { Product } from '../../../auth/interfaces/product.interface';

@Component({
  selector: 'app-search-by-price',
  standalone: true,
  imports: [ProductAdminComponent, NgFor],
  templateUrl: './search-by-price.component.html'
})
export class SearchByPriceComponent {

  price: number = 0
  products = signal<Product[]>([]);

  constructor(private route: ActivatedRoute,
              private productAPIservice: ProductAPIService
      ){
            this.route.params.subscribe({
            next: (response) => {
            this.price = response['price']
            this.getProductByName(this.price)
            }
            })
      }

      private getProductByName(price: number) {
        this.productAPIservice.getProductbyPrice(price).subscribe({
            next: (response: Product[]) => {
            if (response && response.length > 0) {
            this.products.set(response);
            } else {
            Swal.fire({
              icon: 'error',
              title: 'Product not found',
              text: 'Please verify the name',
              confirmButtonText: 'OK'
            });
            console.log("No se encontraron productos con el precio:", price);
            }
        },
        error: (err) => {
        console.error("Error al buscar producto:", err);
        }
        });
      }
}
