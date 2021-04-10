import { CustomerTC, OrderTC, ProductTC } from "../models";

OrderTC.addRelation("orderedBy", {
  resolver: () => CustomerTC.getResolver("findById"),
  prepareArgs: {
    // @ts-ignore
    _id: (source) => source.customerId,
  },
  projection: {
    customerId: true,
  },
});

OrderTC.addRelation("products", {
  resolver: () => ProductTC.getResolver("findByIds"),
  prepareArgs: {
    // @ts-ignore
    _ids: (source) => source.productIds,
  },
  projection: {
    productIds: true,
  },
});
