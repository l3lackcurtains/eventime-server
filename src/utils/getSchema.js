"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var path = require("path");
exports.getSchema = function () {
    var typesArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "../graphql/**/*.graphql"), { recursive: true });
    var resolversArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "../graphql/**/*.resolver.*"), {
        recursive: true
    });
    var typeDefs = merge_graphql_schemas_1.mergeTypes(typesArray);
    var resolvers = merge_graphql_schemas_1.mergeResolvers(resolversArray);
    var executableSchema = graphql_tools_1.makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    });
    return executableSchema;
};
