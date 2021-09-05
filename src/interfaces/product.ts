export interface Product {
    sku: string
    name: string
    price: number
}

export interface ProductCollection {
    [key: string]: Product
}

export interface ProductLineItem {
    product: Product
    discount: number
}

export interface SubtotalLineItem {
    item: ProductLineItem
    amount: number
    discount: number
}