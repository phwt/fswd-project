import { CustomerTC, OrderTC, ProductTC } from "../models";
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
