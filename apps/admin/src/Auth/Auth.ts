import history from '../history';
import auth0 from 'auth0-js';
import {AUTH_CONFIG} from './auth0-variables';
import {PassThrough} from 'stream';

export default class Auth {
  accessToken: any;
  idToken: any;
  expiresAt: any;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  // login() {
  //   this.auth0.authorize();
  // }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth0.login({email: email, password: password}, (response, err) => {
        if (err) {
          const {description} = err;
          reject({message: description || 'Something went wrong.'});
        } else {
          console.log(response);
          this.handleAuthentication();
        }
      });
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult: any) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    localStorage.setItem('user_id', authResult.idTokenPayload.sub);
    localStorage.setItem('user_name', authResult.idTokenPayload.name);
    localStorage.setItem('user_nickname', authResult.idTokenPayload.nickname);
    localStorage.setItem('user_email', authResult.idTokenPayload.email);
    localStorage.setItem('issuer', authResult.idTokenPayload.iss);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);

    // navigate to the home route
    history.replace('/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

// import auth0 from 'auth0-js';

// export default class Auth {
//   auth0 = new auth0.WebAuth({
//     domain: 'ridemyway.auth0.com',
//     clientID: 'nDmdyZeKj-2DkuGssu0mtmqhT11MLSFC',
//     redirectUri: 'http://localhost:3000/callback',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });

//   login() {
//     this.auth0.authorize();
//   }
// }
