import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductAdminComponent } from '@products/components/product-admin/product-admin.component';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { Product} from '../../../auth/interfaces/product.interface';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-by-id',
  standalone: true,
  imports: [ProductAdminComponent, NgIf],
  templateUrl: './search-by-id.component.html'
})
export class SearchByIdComponent {

  id: number = 0
  product = signal<any>(null);

  
  constructor(private route: ActivatedRoute,
              private productAPIservice: ProductAPIService
  ){
    this.route.params.subscribe({
      next: (response) => {
        this.id = parseFloat(response['id'])
        this.getProductById(this.id)

      }
    })
  }

  private getProductById(id: number) {
    this.productAPIservice.getProductbyId(id).subscribe({
      next: (response: Product) => {
        if (response && response.id) {
          this.product.set(response);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Product not found',
          text: 'Please very the id',
          confirmButtonText: 'OK'
        });
        console.error("Error al buscar producto:", err);
      }
    });
  }
} 
