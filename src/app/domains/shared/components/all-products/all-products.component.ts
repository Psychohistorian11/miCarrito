import { Component, inject, OnInit, signal } from '@angular/core';
import { Product, ProductResponse } from '../../../auth/interfaces/product.interface';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { NgFor } from '@angular/common';
import { ProductAdminComponent } from '@products/components/product-admin/product-admin.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ProductAdminComponent, NgFor],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit{

  products = signal<ProductResponse[]>([]);

  productAPIservice = inject(ProductAPIService)

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(){
      this.productAPIservice.getAllProducts().subscribe({
        next: (response: ProductResponse[]) => {
          this.products.set(response)
        }
      })
  }
}
