"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
/*
import { createListTableQuery } from "../models/listModel";
import { createCardTableQuery } from "../models/CardModel";
import { createCardTypeQuery } from "../utils/user_defined_types/cardType";
*/
const clientConfig_1 = __importDefault(require("../config/clientConfig"));
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Execute table creation queries
            yield clientConfig_1.default.execute(UserModel_1.createUserTableQuery);
            /*
            await client.execute(createListTableQuery);
            await client.execute(createCardTableQuery);
    
            // Execute type creation queries
            await client.execute(createCardTypeQuery);
            */
            console.log('Database initialized successfully');
        }
        catch (error) {
            console.error('Error initializing database:', error);
        }
    });
}
exports.default = initializeDatabase;
