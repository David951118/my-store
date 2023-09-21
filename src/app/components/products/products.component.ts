import { Component } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShopingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021 , 1, 21);

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShopingCart = this.storeService.getShopingCart();
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(data =>{
      console.log(data)
      this.products = data;
    })
  }

  onAddToShopingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
