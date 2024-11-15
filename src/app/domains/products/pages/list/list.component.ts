import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { CartService } from '@shared/services/cart.service';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import Swal from 'sweetalert2';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Product } from '../../../auth/interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, LoadingComponent],
  templateUrl: './list.component.html'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<any>([]);
  private cartService = inject(CartService);
  isLoading: boolean = false

  //private productService = inject(ProductService);
  private productAPIservice = inject(ProductAPIService)
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  } 

  ngOnChanges() {
    this.getProducts();
  }


  addToCart(product: Product) {

    if (product) {
      const discountedPrice = product.price * (1 - (product.discount / 100));
      
      const productWithDiscount = {
        ...product,
        price: discountedPrice 
      };
  
      this.cartService.addToCart(productWithDiscount);
    }
  }

  getProducts() {
    this.isLoading = true
    this.productAPIservice.getAllProducts().subscribe({
      next: (products: Product[]) => {
        if(products){
          this.products.set(products);
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
    })
  }

  private getCategories() {
    /*this.productAPIservice.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {
        
      }
    })*/

    const data = this.productAPIservice.getCategories()
    this.categories.set(data)
  }

  getProductByCategory(category: string){
    this.isLoading = true
      this.productAPIservice.getProductbyCategory(category).subscribe({
        next: (response: Product[]) => {
          if(response){
            this.products.set(response)
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
      })
  }
}