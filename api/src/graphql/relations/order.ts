import { CustomerTC, OrderTC, ProductTC, PromotionTC } from "../models";
import { Order } from "@type/SchemaModel";

OrderTC.addRelation("orderedBy", {
  resolver: () => CustomerTC.getResolver("findById"),
  prepareArgs: {
    _id: (source: Order) => source.customerId,
  },
  projection: {
    customerId: true,
  },
});

OrderTC.addRelation("products", {
  resolver: () => ProductTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (source: Order) => source.productIds,
  },
  projection: {
    productIds: true,
  },
});

OrderTC.addRelation("promotions", {
  resolver: () => PromotionTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (source: Order) => source.promotionIds,
  },
  projection: {
    promotionIds: true,
  },
});
