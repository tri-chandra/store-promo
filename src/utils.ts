import { Product, ProductCollection } from "./interfaces/product"

export function productsToProductCollection(products: Product[]) : ProductCollection {
    return products.reduce((accumulator, product) => ({
        ...accumulator,
        [product.sku]: product
    }), {})
}