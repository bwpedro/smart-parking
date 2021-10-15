import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
	jssPreset,
	StylesProvider,
	ThemeProvider,
} from '@material-ui/core/styles';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import SubscriptionProvider from 'context/subscription';
import ParkingProvider, { useParking } from 'context/parking';
import { SnackbarProvider } from 'notistack';
import Parking from './parking';
import defaultTheme from '../themes/default';
import useGlobalStyles from './globalStyles';
import Login from './login/page';

const PreParking: React.FC = () => {
	const storageUser = window.localStorage.getItem('user');

	const { currentUser, setCurrentUser } = useParking();

	useEffect(() => {
		if (storageUser) {
			setCurrentUser(JSON.parse(storageUser));
		}
	}, [storageUser, setCurrentUser]);

	if (!storageUser && !currentUser) {
		return <Login />;
	}

	return <Parking />;
};

const SmartParking: React.FC = () => {
	useGlobalStyles();

	const jss = create({
		plugins: [jssExtend(), ...jssPreset().plugins],
	});

	return (
		<BrowserRouter basename="/">
			<ThemeProvider theme={defaultTheme}>
				<StylesProvider jss={jss}>
					<SnackbarProvider maxSnack={3}>
						<SubscriptionProvider>
							<ParkingProvider>
								<PreParking />
							</ParkingProvider>
						</SubscriptionProvider>
					</SnackbarProvider>
				</StylesProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default SmartParking;
