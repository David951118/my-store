import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShopingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  mYCart$ = this.myCart.asObservable();
  total = 0;

  addProduct(product: Product) {
    this.myShopingCart.push(product);
    this.myCart.next(this.myShopingCart);
  }

  getShopingCart() {
    return this.myShopingCart;
  }

  getTotal() {
    return (this.total = this.myShopingCart.reduce(
      (sum, item) => sum + item.price,
      0
    ));
  }
}
