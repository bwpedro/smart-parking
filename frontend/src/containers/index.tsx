import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
	jssPreset,
	StylesProvider,
	ThemeProvider,
} from '@material-ui/core/styles';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import SubscriptionProvider from 'context/subscription';
import ParkingProvider from 'context/parking';
import { SnackbarProvider } from 'notistack';
import Parking from './parking';
import defaultTheme from '../themes/default';
import useGlobalStyles from './globalStyles';

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
								<Parking />
							</ParkingProvider>
						</SubscriptionProvider>
					</SnackbarProvider>
				</StylesProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default SmartParking;
