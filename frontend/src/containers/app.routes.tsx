import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Driver from './driver/page';
import Login from './login/page';
import Logs from './logs/page';
import Monitor from './monitor/page';
import NewUser from './new-user/page';

const ParkingContent: React.FC = () => (
	<Switch>
		<Redirect from="/" exact to="/parking" />
		<Route path="/parking" component={Monitor} />
		<Route exact path="/driver" component={Driver} />
		<Route exact path="/logs" component={Logs} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/new-user" component={NewUser} />
	</Switch>
);

export default ParkingContent;
