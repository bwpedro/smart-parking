import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import SmartParking from './containers/index';
import stack from './dev.json';

Amplify.configure({
	aws_appsync_graphqlEndpoint: stack.GraphQlApiUrl,
	aws_appsync_region: stack.Region,
	aws_appsync_authenticationType: 'API_KEY',
	aws_appsync_apiKey: stack.GraphQlApiKeyDefault,
});

ReactDOM.render(<SmartParking />, document.querySelector('#root'));
