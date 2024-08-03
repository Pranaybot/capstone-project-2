
import createBaseMiddleware from './baseMiddleware';
import { validateSignup } from '../utils/input_validation/userSignUpValidation';

const signupMiddleware = createBaseMiddleware(validateSignup);

export default signupMiddleware;

