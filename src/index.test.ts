import Checkout from "./services/checkout"
import { productsToProductCollection } from "./utils"
import TestData from "./data/test_data"
import TestData2 from "./data/test_data2"
import { buy3AppleTvFor2, superIpadBulkDiscount } from "./data/test_rules"
import {
    toothpasteHalfPriceDeal,
    handSoapFlatDiscount,
    toothpasteBuy2For1Deal,
    buy2ToothbrushGetToothpaste,
    membershipDiscount,
    mouthwashBulkDiscount,
    pointAwardDiscount
} from "./data/test_rules2"
import RuleSet from "./services/rule_set"
import { ProductCollection } from "./interfaces/product"

describe("Checkout should calculate total correctly", () => {
    describe("with test data 1", () => {
        let testData: ProductCollection
        beforeAll(() => {
            testData = productsToProductCollection(TestData)
        })

        test('without any rule', () => {
            const pricingRules = new RuleSet([], [], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('atv')
            sut.scan('atv')
            sut.scan('atv')
            sut.scan('vga')
            const total = sut.total()
    
            expect(total).toBe(358.5)
        })
    
        test('with 3 for 2 Apple TV deal', () => {
            const pricingRules = new RuleSet([], [buy3AppleTvFor2], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('atv')
            sut.scan('atv')
            sut.scan('atv')
            sut.scan('vga')
            const total = sut.total()
    
            expect(total).toBe(249)
        })
    
        test('with bulk super iPad deal', () => {
            const pricingRules = new RuleSet([], [superIpadBulkDiscount], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('atv')
            sut.scan('ipd')
            sut.scan('ipd')
            sut.scan('atv')
            sut.scan('ipd')
            sut.scan('ipd')
            sut.scan('ipd')
            const total = sut.total()
    
            expect(total).toBe(2718.95)
        })

        test('with both deals', () => {
            const pricingRules = new RuleSet([], [buy3AppleTvFor2, superIpadBulkDiscount], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('atv')
            sut.scan('ipd')
            sut.scan('ipd')
            sut.scan('atv')
            sut.scan('ipd')
            sut.scan('ipd')
            sut.scan('ipd')
            sut.scan('atv')
            const total = sut.total()
    
            expect(total).toBe(2718.95)
        })
    })

    describe("with test data 1", () => {
        let testData: ProductCollection
        beforeAll(() => {
            testData = productsToProductCollection(TestData2)
        })

        test('without any rule', () => {
            const pricingRules = new RuleSet([], [], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tb')
            sut.scan('tp')
            sut.scan('hs')
            sut.scan('f')
            sut.scan('m')
            const total = sut.total()
    
            expect(total).toBe(125)
        })

        test('with toothpaste half price deal', () => {
            const pricingRules = new RuleSet([toothpasteHalfPriceDeal], [], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tb')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(20)
        })

        test('with hand soap flat discount', () => {
            const pricingRules = new RuleSet([handSoapFlatDiscount], [], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('hs')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(40)
        })

        test('with toothpaste buy 2 for 2 deal', () => {
            const pricingRules = new RuleSet([], [toothpasteBuy2For1Deal], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tp')
            sut.scan('tp')
            sut.scan('hs')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(65)
        })

        test('with 2 toothbrush get a toothpaste for free deal', () => {
            const pricingRules = new RuleSet([], [], [buy2ToothbrushGetToothpaste], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tp')
            sut.scan('tb')
            sut.scan('tb')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(40)
        })

        test('with mouthwash bulk discount', () => {
            const pricingRules = new RuleSet([], [mouthwashBulkDiscount], [], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('m')
            sut.scan('m')
            sut.scan('m')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(110)
        })

        test('with points award discount', () => {
            const pricingRules = new RuleSet([], [], [], [pointAwardDiscount])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('m')
            sut.scan('m')
            sut.scan('m')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(130)
        })

        test('with membership discount', () => {
            const pricingRules = new RuleSet([], [], [], [membershipDiscount])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('m')
            sut.scan('m')
            sut.scan('m')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(133)
        })

        test('with 2 overlapping deals', () => {
            const pricingRules = new RuleSet([], [toothpasteBuy2For1Deal], [buy2ToothbrushGetToothpaste], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tp')
            sut.scan('tb')
            sut.scan('tb')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(20)
        })

        test('with 3 overlapping deals', () => {
            const pricingRules = new RuleSet([toothpasteHalfPriceDeal], [toothpasteBuy2For1Deal], [buy2ToothbrushGetToothpaste], [])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tp')
            sut.scan('tb')
            sut.scan('tb')
            sut.scan('tp')
            sut.scan('tp')
            const total = sut.total()
    
            expect(total).toBe(30)
        })

        test('with membership, then points reward', () => {
            const pricingRules = new RuleSet([], [], [], [membershipDiscount, pointAwardDiscount])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tp')
            sut.scan('tb')
            sut.scan('f')
            sut.scan('m')
            const total = sut.total()
    
            expect(total).toBe(85)
        })

        test('with points reward, then memebrship', () => {
            const pricingRules = new RuleSet([], [], [], [pointAwardDiscount, membershipDiscount])
    
            const sut = new Checkout(testData, pricingRules)
            sut.scan('tp')
            sut.scan('tb')
            sut.scan('f')
            sut.scan('m')
            const total = sut.total()
    
            expect(total).toBe(85.5)
        })
    })
})