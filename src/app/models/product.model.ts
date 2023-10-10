export interface Product {
  id?: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  taxes?: number;
}

export type updateProductDTO = Partial<Product>
