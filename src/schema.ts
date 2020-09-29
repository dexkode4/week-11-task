import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Query {
        organizations(first:Int,limit:Int): [OrganizationType!]!
        organization(_id:String!) : OrganizationType
    }

   type Mutation {
        register(email:String!, password: String!): userType
        login(email:String!, password: String!): String

        createOrganization(
                            organization:String!
                            marketValue:String!
                            ceo:String!
                            address:String!
                            employees: [String!]
                            products:[String!]                      
        ): OrganizationType

        updateOrganization(_id: String!
                            organization:String!
                            marketValue:String
                            ceo:String
                            address:String
                            employees: [String]
                            products:[String]                    
        ): OrganizationType
        
        deleteOrganization(organization:String!): OrganizationType

    }

    type userType {
        email: String!
        createdAt: String
        updatedAt: String
    }

    type OrganizationType {
        _id: String
        organization:String!
        marketValue:String
        ceo:String
        address:String
        employees: [String]
        products:[String]
        createdAt: String
        updatedAt: String
    }
`);
