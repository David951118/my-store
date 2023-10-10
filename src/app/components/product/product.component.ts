import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: '',
    title: '',
    image: '',
    price: 0,
    category: '',
    description: '',
    taxes:0,
  };

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<string>();

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
  onShowDetail() {
    this.showDetail.emit(this.product.id);
  }
}
