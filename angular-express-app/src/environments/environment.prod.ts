import { domain, clientId } from '../../auth_conifg.json';

export const environment = {
    production: true,
    apiUrl: 'https://capstone-project-2-i62m.onrender.com'
    auth: {
      domain, 
      clientId,
      redirectUri: window.location.origin
    }
};
  
