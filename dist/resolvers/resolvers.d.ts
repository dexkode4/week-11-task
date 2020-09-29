/// <reference types="mongoose" />
import Joi from "joi";
declare type id = {
    _id: string;
};
declare type organization = {
    organization: string;
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    employees: Array<string>;
    products: Array<string>;
    _id: string;
};
export declare const organizations: ({ first, limit, }: {
    first: number;
    limit: number;
}) => Promise<import("mongoose").Document[]>;
export declare const organization: ({ _id }: id) => Promise<any>;
export declare function createOrganization({ organization, marketValue, ceo, address, employees, products, }: organization): Promise<import("mongoose").Document> | {
    error: Joi.ValidationError | undefined;
};
export declare const deleteOrganization: ({ organization, }: {
    organization: string;
}) => import("mongoose").DocumentQuery<import("mongoose").Document | null, import("mongoose").Document, {}>;
export declare function updateOrganization({ _id, organization, marketValue, ceo, address, employees, products, }: organization): Promise<import("mongoose").Document | null>;
export declare const register: ({ email, password, }: {
    email: string;
    password: string;
}) => Promise<import("mongoose").Document>;
export declare const login: ({ email, password, }: {
    email: string;
    password: string;
}) => Promise<string>;
export {};
