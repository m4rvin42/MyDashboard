import { PublicClientApplication } from '@azure/msal-node';

const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
  },
};

const pca = new PublicClientApplication(msalConfig);

const request = {
  scopes: ['user.read'],
  deviceCodeCallback: (response) => {
    console.log('To sign in, use a web browser to open the page', response.verificationUri);
    console.log('and enter the code:', response.userCode);
  },
};

try {
  const result = await pca.acquireTokenByDeviceCode(request);
  console.log('Login successful for', result.account.username);
} catch (err) {
  console.error('Login failed:', err);
}
