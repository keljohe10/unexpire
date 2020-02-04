const {
  REACT_APP_AUTH_URL,
  REACT_APP_AUTH_USER_PATH,
  REACT_APP_REQUEST_RETRY_ATTEMPTS,
  REACT_APP_REQUEST_RETRY_DELAY
} = process.env;

const request = require("requestretry");

const isAuthorized = async (objectResponse = false) => {
  let userName = 'SYSADM';
  const authToken = utils.getCookie( process.env.REACT_APP_SECURE_COOKIE);
  let hasError = false,
    response;
  try {
    response = await request.get({
      url: `${REACT_APP_AUTH_URL}${REACT_APP_AUTH_USER_PATH}`,
      json: true,
      fullResponse: true,
      headers: {
        authorization: authToken
      },
      // The below parameters are specific to request-retry
      maxAttempts: REACT_APP_REQUEST_RETRY_ATTEMPTS || 3, // (default) try 3 times
      retryDelay: REACT_APP_REQUEST_RETRY_DELAY || 500, // (default) wait for 500s before trying again
      retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
    });
  } catch (error) {
    hasError = true;
    console.error(
      JSON.stringify({
        message: "Error trying to authorize",
        error: {
          message: error.message,
          stack: error.stack,
          config: error.config
        }
      })
    );
  }

  //objectResponse: if it's true return object, otherwise return boolean.
  if (objectResponse) {
    let result;
    if (hasError) {
      result = {
        authorized: false,
        userName: null,
        id: null,
        roles: []
      };
    } else {
      result = {
        authorized: true,
        userName: response.body.userName,
        id: response.body.id,
        roles: response.body.roles || []
      };
    }
    return result;
  }

  if (hasError) {
    return false;
  }

  let loggerUserId = response.body.id > 0 ? response.body.id : 0;
  //contemplate client_application user as id 1
  loggerUserId =
    loggerUserId == 0 &&
    response.body.userName &&
    response.body.userName.length > 0
      ? 1
      : loggerUserId;
  if (userName && userName.length > 0) {
    loggerUserId = userName === response.body.userName ? loggerUserId : 0;
  }
  return response.statusCode === 200 && loggerUserId > 0 ? true : false;
};

const getCookie = cookieName => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let char = ca[i];
    while (char.charAt(0) === " ") {
      char = char.substring(1);
    }
    if (char.indexOf(name) === 0) {
      return char.substring(name.length, char.length);
    }
  }
  return "";
};

const utils = {
  isAuthorized,
  getCookie
};

module.exports = utils;
