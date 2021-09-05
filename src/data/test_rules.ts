import { SubtotalRule } from "../interfaces/rule";
import { createNForMDeal, createBulkDiscountRule } from "../services/rule_generator";

export const buy3AppleTvFor2: SubtotalRule = createNForMDeal("atv", 3, 1)
export const superIpadBulkDiscount: SubtotalRule = createBulkDiscountRule("ipd", 4, 50)