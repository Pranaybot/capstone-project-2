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
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const signupMiddleware_1 = __importDefault(require("../middleware/signupMiddleware"));
const loginMiddleware_1 = __importDefault(require("../middleware/loginMiddleware"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
function do_login(user, req) {
    req.session.user_id = user.id; // Use session or any other way to manage login state
    req.session.isLoggedIn = true;
}
function do_logout(req) {
    delete req.session.user_id;
    req.session.isLoggedIn = false;
}
router.post('/signup', signupMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, username, pwd } = req.body;
    try {
        const user = yield userController.signup(firstname, lastname, username, pwd);
        if (user) {
            do_login(user, req);
            res.redirect("/work_area");
        }
    }
    catch (error) {
        console.error('Failed to create user', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}));
router.post('/login', loginMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, pwd } = req.body;
    try {
        const user = yield userController.login(username, pwd);
        if (user) {
            do_login(user, req);
            res.redirect('/work_area');
        }
    }
    catch (error) {
        console.error('Invalid username or password', error);
        res.status(500).json({ error: 'Invalid username or password' });
    }
}));
router.get('/logout', (req, res) => {
    do_logout(req);
    res.redirect("/");
});
exports.default = router;
