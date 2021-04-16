import { CustomerTC, OrderTC } from "../models";
import { Customer } from "@type/SchemaModel";

CustomerTC.addRelation("orders", {
  resolver: () => OrderTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source: Customer) => ({ customerId: source._id }),
  },
  projection: {
    _id: true,
  },
});
