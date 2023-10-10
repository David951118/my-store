import { Component } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
// import { switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShopingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChoosen: Product = {
    id: '',
    title: '',
    image: '',
    price: 0,
    category: '',
    description: '',
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShopingCart = this.storeService.getShopingCart();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      console.log('Productos', data);
      this.products = data;
    });
    // this.productService.getProductByPage(10, 5).subscribe((data) => {
    //   console.log('Productos', data);
    //   this.products = data;
    //   this.offset = +this.limit;
    // });
  }

  onAddToShopingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleproductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleproductDetail();
    this.productService.getProduct(id).subscribe(
      (data) => {
        this.productChoosen = data;
        this.statusDetail = 'success';
      },
      (response) => {
        window.alert(response);
        this.statusDetail = 'error';
      }
    );
  }

  // readAndUpdate(id: number) {
  //   this.productService
  //     .getProduct(id)
  //     .pipe(
  //       switchMap((product) =>
  //         this.productService.update(product.id, { title: 'change' })),
  //     )
  //     .subscribe(data =>{
  //       console.log(data)
  //     });
  //     zip(
  //       this.productService.getProduct(id),
  //       this.productService.update(id, {title: 'nuevo'} )
  //     )
  //     .subscribe(response =>{
  //       const product = response[0];
  //       const update = response[1];
  //     })
  // }

  createNewProduct() {
    const product: Product = {
      title: 'Nuevo producto',
      price: 1000,
      description: 'Descripción creativa',
      image:
        'https://cdn1.totalcommerce.cloud/mercacentro/product-zoom/es/chocolatina-nucita-20-g-1.webp',
      category: 'electronic',
    };
    this.productService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes = {
      title: 'Nuevo producto',
      price: 1000,
      description: 'Descripción creativa',
      image:
        'https://cdn1.totalcommerce.cloud/mercacentro/product-zoom/es/chocolatina-nucita-20-g-1.webp',
      category: 'electronic',
    };
    const id = this.productChoosen?.id; // Usar el operador de opcional (?)
    if (id) {
      this.productService.update(id, changes).subscribe((data) => {
        const productindex = this.products.findIndex(
          (item) => item.id === this.productChoosen.id
        );
        this.products[productindex] = data;
        this.productChoosen = data;
      });
    } else {
      console.error('El ID del producto es undefined.');
    }
  }

  deleteProduct() {
    const id = this.productChoosen?.id;
    if (id) {
      this.productService.delete(id).subscribe(() => {
        const productindex = this.products.findIndex(
          (item) => item.id === this.productChoosen.id
        );
        this.products.splice(productindex, 1);
        this.showProductDetail = false;
      });
    }
  }

  loadMore() {
    this.productService
      .getProductByPage(this.limit, this.offset)
      .subscribe((data) => {
        console.log('Productos', data);
        this.products = this.products.concat(data);
        this.offset = +this.limit;
      });
  }
}
