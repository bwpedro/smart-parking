import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Driver from './driver/page';
import Negotiation from './negotiation/page';
import ParkingActivity from './monitor/page';

const ParkingContent: React.FC = () => (
	<Switch>
		<Redirect from="/" exact to="/parking" />
		<Route path="/parking" component={ParkingActivity} />
		<Route exact path="/driver" component={Driver} />
		<Route exact path="/negotiation" component={Negotiation} />
	</Switch>
);

export default ParkingContent;
