
import createBaseMiddleware from './baseMiddleware';
import { validateLogin } from '../utils/input_validation/userLogInValidation';

const loginMiddleware = createBaseMiddleware(validateLogin);

export default loginMiddleware;

