import createBaseMiddleware from './baseMiddleware';
import { validateLogin } from '../utils/input_validaton/userLogInValidation';

const loginMiddleware = createBaseMiddleware(validateLogin);

export default loginMiddleware;
