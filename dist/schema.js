"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_1 = require("graphql");
exports.schema = graphql_1.buildSchema("\n    type Query {\n        organizations(first:Int,limit:Int): [OrganizationType!]!\n        organization(_id:String!) : OrganizationType\n    }\n\n   type Mutation {\n        register(email:String!, password: String!): userType\n        login(email:String!, password: String!): String\n\n        createOrganization(\n                            organization:String!\n                            marketValue:String!\n                            ceo:String!\n                            address:String!\n                            employees: [String!]\n                            products:[String!]                      \n        ): OrganizationType\n\n        updateOrganization(_id: String!\n                            organization:String!\n                            marketValue:String\n                            ceo:String\n                            address:String\n                            employees: [String]\n                            products:[String]                    \n        ): OrganizationType\n        \n        deleteOrganization(organization:String!): OrganizationType\n\n    }\n\n    type userType {\n        email: String!\n        createdAt: String\n        updatedAt: String\n    }\n\n    type OrganizationType {\n        _id: String\n        organization:String!\n        marketValue:String\n        ceo:String\n        address:String\n        employees: [String]\n        products:[String]\n        createdAt: String\n        updatedAt: String\n    }\n");
