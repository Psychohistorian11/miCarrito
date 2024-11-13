import { Component, signal, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authAservice: AuthService){

  }

    hideSideMenu = signal(true);
    private cartService = inject(CartService);
    cart = this.cartService.cart;
    total = this.cartService.total;
    
    toogleSideMenu(){
        this.hideSideMenu.update(prevState => !prevState)
    }

    itsAdmin(){
      return this.authAservice.itsAdmin()
    }
}
