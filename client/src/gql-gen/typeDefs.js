"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var graphql_tag_1 = require("graphql-tag");
// import { mergeTypes } from 'merge-graphql-schemas'
exports.typeDefs = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    token: String!\n    userId: String\n  }\n  type Mutation {\n    logout: String\n  }\n"], ["\n  type Query {\n    token: String!\n    userId: String\n  }\n  type Mutation {\n    logout: String\n  }\n"])));
exports["default"] = exports.typeDefs;
var templateObject_1;
