const config = {
  appName: 't5 v0.0.3',
  appSite: 'https://distracted-lovelace-530204.netlify.com/',
  // Current live test site
  scope: 'read:favourites',
};

const init = function init() {
  setupEventListeners();
  // Wait for the user to submit their instance, then run all functions
  if (window.location.search) {
    // if the authorization_code code has been returned, it will be in the URL
    getAuthToken();
  }
};

const setupEventListeners = function setupEventListeners() {
  document.querySelector('.add-new-instance')
    .addEventListener('submit', (e) => {
      window.localStorage.setItem('baseUrl', `https://${document.querySelector('.add-new-instance-input').value}`);
      e.preventDefault();
      getClientSecret();
    });
};

const getClientSecret = function getClientSecret() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST',
    `${window.localStorage.getItem('baseUrl')}/api/v1/apps`,
    true);

  const params = new FormData();
  params.append('client_name', config.appName);
  params.append('scopes', config.scope);
  params.append('redirect_uris', config.appSite);
  xhr.onreadystatechange = () => {
    if (
      xhr.readyState === XMLHttpRequest.DONE
      && xhr.status === 200
    ) {
      const clientId = JSON.parse(xhr.responseText).client_id;
      const clientSecret = JSON.parse(xhr.responseText).client_secret;
      window.localStorage.setItem(`${config.appName}clientId`, clientId);
      window.localStorage.setItem(`${config.appName}clientSecret`, clientSecret);
      auth();
    }
  };
  xhr.send(params);
};

const auth = function authorizeApplication() {
  const url = encodeURI(
    `${window.localStorage.getItem('baseUrl')}/oauth/authorize?`
    + `scope=${config.scope}&`
    + 'response_type=code&'
    + `redirect_uri=${config.appSite}&`
    + `client_id=${window.localStorage.getItem(`${config.appName}clientId`)}`,
  );
  window.location.href = url;
};

const getAuthToken = function useAuthCodeToGetAuthToken() {
  window.localStorage.setItem(`${config.appName}t5AuthCode`,
    window.location.search.split('=')[1]);
  const xhr = new XMLHttpRequest();
  xhr.open('POST',
    `${window.localStorage.getItem('baseUrl')}/oauth/token`,
    true);

  const params = new FormData();
  params.append('client_id',
    window.localStorage.getItem(`${config.appName}clientId`));
  params.append('client_secret',
    window.localStorage.getItem(`${config.appName}clientSecret`));
  params.append('grant_type', 'authorization_code');
  params.append('code', window.localStorage.getItem(`${config.appName}t5AuthCode`));
  params.append('redirect_uri', 'urn:ietf:wg:oauth:2.0:oob');

  xhr.send(params);
};

init();
