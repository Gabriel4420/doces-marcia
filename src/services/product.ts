import { Product } from "@/types/product";
import {products} from "@/data/products";


export const getAllProducts = async (): Promise<Array<Product>> => {

  return new Promise((resolve) => setTimeout(() => { resolve(products)}, 2000));
}