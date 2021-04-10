import { schemaComposer } from "graphql-compose";

import "./relations";
import * as queryFields from "./queries";
import * as mutationFields from "./mutations";

schemaComposer.Query.addFields(queryFields);
schemaComposer.Mutation.addFields(mutationFields);

const GQLSchema = schemaComposer.buildSchema();

export default GQLSchema;
