import { ProductRule, PreTotalRule, SubtotalRule, TotalRule } from "../interfaces/rule";
import {
    createNForMDeal,
    createBulkDiscountRule,
    createBuyNGetBonusMDeal,
    createFlatTotalDiscountRule,
    createPercentageTotalDiscountRule,
    createProductFlatDiscountRule,
    createProductPercentageDiscountRule
} from "../services/rule_generator";

export const toothpasteHalfPriceDeal: ProductRule = createProductPercentageDiscountRule("tp", 50)
export const handSoapFlatDiscount: ProductRule = createProductFlatDiscountRule("hs", 5)

export const toothpasteBuy2For1Deal: SubtotalRule = createNForMDeal("tp", 2, 1)
export const mouthwashBulkDiscount: SubtotalRule = createBulkDiscountRule("m", 3, 10)

export const buy2ToothbrushGetToothpaste: PreTotalRule = createBuyNGetBonusMDeal("tb", 2, "tp", 1)

export const pointAwardDiscount: TotalRule = createFlatTotalDiscountRule(10)
export const membershipDiscount: TotalRule = createPercentageTotalDiscountRule(5)