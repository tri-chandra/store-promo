import { Product, ProductLineItem, SubtotalLineItem } from "./product";

export interface ProductRule {
    affectedProducts: Set<string>,
    calculateDiscount(item: Product): number
}

export interface SubtotalRule {
    affectedProducts: Set<string>,
    calculateDiscount(item: ProductLineItem, amount: number): number
}

export interface PreTotalRule {
    affectedProducts: Set<string>,
    calculate(items: SubtotalLineItem[]): SubtotalLineItem[]
}

export interface TotalRule {
    affectedProducts: Set<string>,
    calculateDiscount(total: number): number
}
