"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserController = void 0;
const bcrypt = __importStar(require("bcrypt")); // Import bcrypt for password hashing
const cassandra_driver_1 = __importDefault(require("cassandra-driver"));
const clientConfig_1 = __importDefault(require("../config/clientConfig"));
const uuid_1 = require("uuid"); // Import UUID generator
const user_1 = __importDefault(require("../utils/queries/user"));
class UserController {
    signup(firstName, lastName, userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, uuid_1.v4)(); // Generate a new UUID for the user
                const hashedPassword = yield bcrypt.hash(password, 10);
                const insertParams = [cassandra_driver_1.default.types.Uuid.fromString(id), firstName, lastName,
                    userId, hashedPassword];
                yield clientConfig_1.default.execute(user_1.default.INSERT_USER, insertParams, { prepare: true });
                const selectParams = [cassandra_driver_1.default.types.Uuid.fromString(id)];
                const result = yield clientConfig_1.default.execute(user_1.default.SELECT_USER_BY_ID, selectParams, { prepare: true });
                if (result.rows.length === 0) {
                    console.error('Error retrieving newly created user');
                    return null;
                }
                const newUser = result.rows[0];
                return newUser;
            }
            catch (error) {
                console.error('Error creating user:', error);
                return null;
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the query to use username instead of id
                const selectParams = [username];
                const result = yield clientConfig_1.default.execute(user_1.default.SELECT_USER_BY_USERNAME, selectParams, { prepare: true });
                if (result.rows.length === 0) {
                    return null; // User not found
                }
                const user = result.rows[0];
                const isPasswordValid = yield bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    return user;
                }
                else {
                    console.error('Incorrect password');
                    return null;
                }
            }
            catch (error) {
                console.error('Error logging in user:', error);
                return null;
            }
        });
    }
}
exports.UserController = UserController;
