"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cassandra_driver_1 = __importDefault(require("cassandra-driver"));
const cassandraConfig_1 = __importDefault(require("../config/cassandraConfig"));
const client = new cassandra_driver_1.default.Client(cassandraConfig_1.default);
exports.default = client;
