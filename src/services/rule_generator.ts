import { Product, ProductLineItem, SubtotalLineItem } from "../interfaces/product";
import { ProductRule, SubtotalRule, PreTotalRule, TotalRule } from "../interfaces/rule";

export function defaultProductRule(): ProductRule {
    return {
        affectedProducts: new Set(),
        calculateDiscount: (_product: Product): number => 0
    }
}

export function createProductFlatDiscountRule(productSku: string, discountAmount: number): ProductRule {
    return {
        affectedProducts: new Set([productSku]),
        calculateDiscount: (product: Product): number => {
        if (product.sku === productSku) {
            return discountAmount
        } else {
            return 0
        }
    }
    }
}

export function createProductPercentageDiscountRule(productSku: string, discountPercent: number): ProductRule {
    return {
        affectedProducts: new Set([productSku]),
        calculateDiscount: (product: Product): number => {
            if (product.sku === productSku) {
                return discountPercent * product.price / 100
            } else return 0
        }
    }
}

export function defaultSubtotalRule(): SubtotalRule {
    return {
        affectedProducts: new Set([]),
        calculateDiscount: (_item: ProductLineItem, _amount: number): number => 0
    }
}

export function createNForMDeal(productSku: string, n: number, freeCount: number): SubtotalRule {
    return {
        affectedProducts: new Set([productSku]),
        calculateDiscount: (item: ProductLineItem, amount: number): number => {
            if (item.product.sku === productSku && amount >= n) {
                return Math.floor(amount / n) * freeCount * (item.product.price - item.discount)
            } else {
                return 0
            }
        }
    }
}

export function createBulkDiscountRule(productSku: string, n: number, discountAmount: number): SubtotalRule {
    return {
        affectedProducts: new Set([productSku]),
        calculateDiscount: (item: ProductLineItem, amount: number): number => {
            if (amount >= n) {
                return discountAmount * amount
            } else {
                return 0
            }
        }
    }
}

export function defaultPreTotalRule(): PreTotalRule {
    return {
        affectedProducts: new Set([]),
        calculate: (subtotals: SubtotalLineItem[]): SubtotalLineItem[] => subtotals
    }
}

export function createBuyNGetBonusMDeal(boughtProductSku: string, n: number, bonusProductSku: string, m: number): PreTotalRule {
    return {
        affectedProducts: new Set([boughtProductSku, bonusProductSku]),
        calculate: (subtotals: SubtotalLineItem[]): SubtotalLineItem[] => {
            const boughtSku = subtotals.findIndex(item => item.item.product.sku === boughtProductSku && item.amount >= n)
            const newSubtotal = [...subtotals]

            if (boughtSku > -1) {
                const bonusSku = subtotals.findIndex(item => item.item.product.sku === bonusProductSku)

                newSubtotal[bonusSku].discount += Math.floor(subtotals[boughtSku].amount / n) * m * (subtotals[bonusSku].item.product.price - subtotals[bonusSku].item.discount)
            }
            
            return newSubtotal
        }
    }
}

export function defaultTotalRule(): TotalRule {
    return {
        affectedProducts: new Set([]),
        calculateDiscount: (total: number): number => 0
    }
}

export function createFlatTotalDiscountRule(discountAmount: number): TotalRule {
    return {
        affectedProducts: new Set(),
        calculateDiscount: (total: number): number => {
            return discountAmount
        }
    }
}

export function createPercentageTotalDiscountRule(discountPercent: number): TotalRule {
    return {
        affectedProducts: new Set(),
        calculateDiscount: (total: number): number => {
            return discountPercent * total / 100
        }
    }
}