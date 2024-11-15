import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html'
})
export default class MenuComponent {

  router = inject(Router)

  onSearchByName(event: Event){
    const name  = (event.target as HTMLInputElement).value
    this.router.navigate([`administrator/search-by-name/${name}`])
  }

  onSearchById(event: Event){
    const id = (event.target as HTMLInputElement).value
    this.router.navigate([`administrator/search-by-id/${id}`])
  }

  onSearchByPrice(event: Event){
    const price = (event.target as HTMLInputElement).value
    this.router.navigate([`administrator/search-by-price/${price}`])
  }
}
