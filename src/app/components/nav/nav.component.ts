import { Component } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  activeMenu = false;
  counter= 0;

  constructor(
    private storeService: StoreService
  ){}

  OnInit(): void {
    this.storeService.mYCart$.subscribe(products => {
      this.counter = products.length;
    })

  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

}
