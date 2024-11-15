import { Component, inject, Input } from '@angular/core';
import { Product} from '../../../auth/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductAPIService } from '../../../../API/fastapi/product-api.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CurrencyPipe, LoadingComponent],
  templateUrl: './product-admin.component.html'
})
export class ProductAdminComponent {

  @Input({required: true}) product!: Product
  isLoading: boolean = false

  productAPIservice = inject(ProductAPIService)
  router = inject(Router)

  onEditProduct(product: Product){
      this.router.navigate([`administrator/edit-product/${product.id}`])
  }

  onDeleteProduct(product: Product) {
    Swal.fire({
      title: 'Are you sure?',
      html: `
        <div class="group rounded-t-lg mt-10">
          <a class="w-full overflow-hidden rounded-t-lg bg-gray-200">
            <img src="${product.image}" alt="${product.name}" class="min-h-64 max-h-64 h-full w-full object-cover object-center group-hover:opacity-75 rounded-t-lg">
          </a>
          <div class="flex flex-col space-y-2 p-4 border border-t-2">
            <h3 class="text-sm text-gray-700">${product.name}</h3>
            <p class="text-lg font-medium text-gray-900">${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(product.price)}</p>
            <p class="text-sm font-medium text-gray-500">Descuento del ${product.discount}%</p>
          </div>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProductConfirmed(product);
      } else {
        // No se elimina y la alerta simplemente se cierra.
      }
    });
  }

  deleteProductConfirmed(product: Product) {
    this.isLoading = true;
    this.productAPIservice.deletebyId(product.id!).subscribe({
      next: (response) => {
        console.log("Respuesta de la API: ", response);
        if (response) {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Product has been deleted',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Product could not be deleted',
          text: 'Please verify',
          confirmButtonText: 'OK'
        });
        console.error("Error al eliminar producto:", err);
      }
    });
  }
  

}
