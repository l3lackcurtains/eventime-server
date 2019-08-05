"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var helmet = require("helmet");
var redisStore = require("connect-redis");
var session = require("express-session");
var graphql_yoga_1 = require("graphql-yoga");
var redis = require("redis");
require("reflect-metadata");
var createTypeormConnection_1 = require("./utils/createTypeormConnection");
var getSchema_1 = require("./utils/getSchema");
var SECRET = "sessionSecretValue";
var redisClient = redis.createClient();
var redisStoreSession = redisStore(session);
exports.startServer = function () { return __awaiter(_this, void 0, void 0, function () {
    var schema, server, store, corsOptions, options, app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = getSchema_1.getSchema();
                server = new graphql_yoga_1.GraphQLServer({
                    schema: schema,
                    context: function (_a) {
                        var request = _a.request;
                        return ({
                            session: request.session,
                            req: request
                        });
                    }
                });
                /**
                 * Experess Middlewares
                 */
                server.express.use(helmet());
                store = new redisStoreSession({
                    host: "redis",
                    port: 6379,
                    client: redisClient,
                    ttl: 86400
                });
                /**
                 * Session Setup
                 */
                server.express.use(session({
                    name: "xy45",
                    secret: SECRET,
                    cookie: {
                        secure: false,
                        maxAge: 120000000
                    },
                    resave: false,
                    saveUninitialized: false,
                    store: store
                }));
                /**
                 * Connect typeorm with PostgreSQL
                 */
                return [4 /*yield*/, createTypeormConnection_1.createTypeormConnection()];
            case 1:
                /**
                 * Connect typeorm with PostgreSQL
                 */
                _a.sent();
                corsOptions = {
                    origin: "http://localhost:3000",
                    credentials: true
                };
                options = {
                    port: process.env.NODE_ENV === "test" ? 7000 : 8000,
                    endpoint: "/graphql",
                    playground: "/playground",
                    cors: corsOptions
                };
                return [4 /*yield*/, server.start(options, function () {
                        return console.log("[Started] http://localhost:" + options.port);
                    })];
            case 2:
                app = _a.sent();
                return [2 /*return*/, app];
        }
    });
}); };
exports.startServer();
