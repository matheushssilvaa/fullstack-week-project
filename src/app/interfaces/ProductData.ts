import { Product } from "@prisma/client";

export interface ProductData {
    product: Product
    quantity: number
}