import createBaseMiddleware from './baseMiddleware';
import { validateSignup } from '../utils/input_validaton/userSignUpValidation';

const signupMiddleware = createBaseMiddleware(validateSignup);

export default signupMiddleware;
