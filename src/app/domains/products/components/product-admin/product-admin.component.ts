import { Component, Input } from '@angular/core';
import { Product } from '../../../auth/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent {
  @Input({required: true}) product!: Product 
}
