# Store Promo
## Concept
The aim of this checkout module is to be configurable to accomodate future changes. In order to achieve this, we break down the steps required to calculate total and allow rules to be executed as "middleware" on each of those steps.

The checkout module has the following data structure:
```
total = {
  lineItems: [
    {
      amount: ..,
      discount: ..
      item: {
        product: ..,
        discount: ..
      }
    },
    ...
  ],
  discount
}
```

Deals/offers are implemented by rules that calculate `discount` value on various level. There are 4 types of rules:
- Product level rule: calculate the value of `total.lineItems[..].item.discount`. This rule will handle deals such as half price, or flat price discount.
- Subtotal/line item level rule: calculate the value of `total.lineItems[..].discount`. This rule is for when the deal depends on the amount of items purchased, such as bulk discount or buy 3 for the price of 2 deals.
- Pre-total level rule: calculate the value of `total.lineItems[..].discount`. This rule is executed after subtotal rule, and is meant for a more complex condition that affects multiple line items. Example: buying 4 toothbrush to get discount on toothpaste, bulk discount applied when buying any 4 ice cream, etc.
- Total level rule: calculate the value of `total.discount`. This rule is meant as a global discount for the entire transaction.


## Running the module
Install required dependencies
```
yarn
```
Going through sample scenarios
```
yarn test
```

## Example
With the following products in our catalogue:
| SKU     | Name        | Price    |
| --------|:-----------:| --------:|
| ipd     | Super iPad  | $549.99  |
| mbp     | MacBook Pro | $1399.99 |
| atv     | Apple TV    | $109.50  |
| vga     | VGA adapter | $30.00   |

As we're launching our new computer store, we would like to have a few opening day specials.

- we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
- the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4

Our checkout system can scan items in any order.

The interface to our checkout looks like this (shown in typescript):

```typescript
  const co = new Checkout(pricingRules);
  co.scan(item1);
  co.scan(item2);
  co.total();
```

### Example scenarios
-----------------

SKUs Scanned: atv, atv, atv, vga
Total expected: $249.00

SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
Total expected: $2718.95