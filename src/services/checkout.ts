import RuleSet from "./rule_set"
import { Product, ProductCollection, ProductLineItem, SubtotalLineItem } from "../interfaces/product"

export default class Checkout {
    _rules: RuleSet
    _products: ProductCollection
    _cart = <string[]>[]

    constructor(products: ProductCollection, rules: RuleSet) {
        this._rules = rules
        this._products = products
    }

    public scan(sku: string) {
        if (this._products[sku]) {
            this._cart.push(sku)
        }
    }

    public total() {
        let totalAmount = 0
        const subtotalMap: {[key: string]: number} = {}
        this._cart.forEach(sku => {
            if (subtotalMap[sku]) {
                subtotalMap[sku]++
            } else {
                subtotalMap[sku] =  1
            }
        })

        let subtotalLineItems = Object.entries(subtotalMap).map(([sku, amount]) => {
            const product = this._products[sku]
            const productLineItem: ProductLineItem = {
                product,
                discount: 0
            }
            // group items and calculate discount per item
            this._rules.productRules.forEach(rule => {
                productLineItem.discount += rule.calculateDiscount(product)
            })

            // calculate subtotal discounts
            const subtotalLineItem: SubtotalLineItem = {
                item: productLineItem,
                amount,
                discount: 0
            } 
            this._rules.subtotalRules.forEach(rule => {
                subtotalLineItem.discount += rule.calculateDiscount(productLineItem, amount)
            })

            return subtotalLineItem
        })

        // calculate discount for more complex rules
        this._rules._preTotalRules.forEach(rule => {
            subtotalLineItems = rule.calculate(subtotalLineItems)
        })

        // calculate temporary total
        subtotalLineItems.forEach(lineItem => {
            const perItemPrice = Math.max(0, lineItem.item.product.price - lineItem.item.discount)
            const subtotal = Math.max(0, (perItemPrice * lineItem.amount) - lineItem.discount)

            totalAmount += subtotal
        })

        // apply global discounts
        this._rules._totalRules.forEach(rule => {
            totalAmount = Math.max(0, totalAmount - rule.calculateDiscount(totalAmount))
        })

        return totalAmount
    }
}