import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { Product } from '../../../auth/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export default class ProductDetailComponent {

  @Input() id?: number;
  product = signal<Product | null>(null);
  cover = signal('');
  private cartService = inject(CartService);
  private productAPIservice = inject(ProductAPIService)

  ngOnInit() {
    if (this.id) {
      this.productAPIservice.getProductbyId(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
        }
      })
    }
    
  }

  addToCart() {
    const product = this.product();
    if (product) {
      const discountedPrice = product.price * (1 - (product.discount / 100));
      
      const productWithDiscount = {
        ...product,
        price: discountedPrice
      };
        this.cartService.addToCart(productWithDiscount);
    }
  }


}