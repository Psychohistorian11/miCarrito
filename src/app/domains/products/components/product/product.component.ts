import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe, CurrencyPipe, NgIf } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '../../../auth/interfaces/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, RouterLinkWithHref, NgIf],
  templateUrl: './product.component.html'
})

export class ProductComponent {
    @Input({required: true}) product!: Product

    @Output() addToCart = new EventEmitter();

    addToCartHandler() {
        this.addToCart.emit(this.product);
    }
}
