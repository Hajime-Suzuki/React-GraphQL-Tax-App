"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var dummyTypes = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Project {\n    id: String!\n  }\n"], ["\n  type Project {\n    id: String!\n  }\n"])));
exports.typeDefs = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n  type Query {\n    token: String!\n    userId: String\n  }\n  type Mutation {\n    sortProject: Project\n  }\n"], ["\n  ", "\n  type Query {\n    token: String!\n    userId: String\n  }\n  type Mutation {\n    sortProject: Project\n  }\n"])), dummyTypes);
exports.default = exports.typeDefs;
var templateObject_1, templateObject_2;
