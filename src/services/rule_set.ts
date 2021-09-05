import { ProductRule, SubtotalRule, PreTotalRule, TotalRule } from "../interfaces/rule"
import { defaultProductRule, defaultSubtotalRule, defaultPreTotalRule, defaultTotalRule } from "./rule_generator"

export default class RuleSet {
    _productRules: ProductRule[]
    _subtotalRules: SubtotalRule[]
    _preTotalRules: PreTotalRule[]
    _totalRules: TotalRule[]

    constructor(productRules: ProductRule[], subtotalRules: SubtotalRule[], preTotalRules: PreTotalRule[], totalRules: TotalRule[]) {
        this._validateRules(productRules, subtotalRules, preTotalRules, totalRules)

        this._productRules = [...productRules, defaultProductRule()]
        this._subtotalRules = [...subtotalRules, defaultSubtotalRule()]
        this._preTotalRules = [...preTotalRules, defaultPreTotalRule()]
        this._totalRules = [...totalRules, defaultTotalRule()]
    }

    get productRules() {
        return this._productRules
    }

    get subtotalRules() {
        return this._subtotalRules
    }

    get preTotalRules() {
        return this._preTotalRules
    }

    get totalRules() {
        return this._totalRules
    }

    _validateRules(productRules: ProductRule[], subtotalRules: SubtotalRule[], preTotalRules: PreTotalRule[], totalRules: TotalRule[]) {
        let affectedProductSet = new Set<string>()

        productRules.forEach(rule => {
            const intersect = [...rule.affectedProducts].find(x => affectedProductSet.has(x))
            if (intersect) {
                console.warn(`Overlapping rule detected for ${intersect}`)
            }
            affectedProductSet = new Set([...affectedProductSet, ...rule.affectedProducts])
        })
        subtotalRules.forEach(rule => {
            const intersect = [...rule.affectedProducts].find(x => affectedProductSet.has(x))
            if (intersect) {
                console.warn(`Overlapping rule detected for ${intersect}`)
            }
            affectedProductSet = new Set([...affectedProductSet, ...rule.affectedProducts])
        })
        preTotalRules.forEach(rule => {
            const intersect = [...rule.affectedProducts].find(x => affectedProductSet.has(x))
            if (intersect) {
                console.warn(`Overlapping rule detected for ${intersect}`)
            }
            affectedProductSet = new Set([...affectedProductSet, ...rule.affectedProducts])
        })
        totalRules.forEach(rule => {
            const intersect = [...rule.affectedProducts].find(x => affectedProductSet.has(x))
            if (intersect) {
                console.warn(`Overlapping rule detected for ${intersect}`)
            }
            affectedProductSet = new Set([...affectedProductSet, ...rule.affectedProducts])
        })
    }
}