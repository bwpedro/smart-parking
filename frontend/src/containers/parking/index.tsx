/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParking } from 'context/parking';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';
import getAllSpots from 'requests/getAllSpots';
import Header from 'components/header';
import SideMenu from 'components/sideMenu';
import { useSubscription } from '../../context/subscription';
import * as Types from '../../api/types';
import {
	onRequestSpot,
	onCarArrived,
	onCarLeft,
	onRequestFailed,
	onRequestSuccess,
} from '../../graphql/subscriptions';
import ParkingContent from '../app.routes';
import useStyles from './styles';

function sortAlphaNumber(a: Types.Spot, b: Types.Spot) {
	const reA = /[^A-Za-z]/g;
	const reN = /\D/g;

	const aA = a.spot.replace(reA, '');
	const bA = b.spot.replace(reA, '');
	if (aA === bA) {
		const aN = Number.parseInt(a.spot.replace(reN, ''), 10);
		const bN = Number.parseInt(b.spot.replace(reN, ''), 10);
		return aN === bN ? 0 : aN > bN ? 1 : -1;
	}
	return aA > bA ? 1 : -1;
}

const Parking: React.FC = () => {
	const rootClasses = useStyles();
	const subscriptions = useSubscription();
	const { allSpots, setAllSpots, updateSpot } = useParking();

	const [sideMenuIsOpen, setSideMenuOpen] = useState(false);

	useEffect(() => {
		void getAllSpots((error, result) => {
			if (result && result.getAllSpots) {
				setAllSpots(result.getAllSpots.sort(sortAlphaNumber));
			} else if (error) {
				console.error(error);
			}
		});
	}, []);

	useEffect(() => {
		if (!subscriptions) {
			return;
		}

		subscriptions.subscribe<Types.Spot>({ onRequestSpot }, (response) => {
			if (response) {
				updateSpot(response);
			}
		});

		subscriptions.subscribe<Types.Spot>({ onCarArrived }, (response) => {
			if (response) {
				updateSpot(response);
			}
		});

		subscriptions.subscribe<Types.Spot>({ onCarLeft }, (response) => {
			if (response) {
				updateSpot(response);
			}
		});

		subscriptions.subscribe<Types.Spot>({ onRequestFailed }, (response) => {
			if (response) {
				updateSpot(response);
			}
		});

		subscriptions.subscribe<Types.Spot>(
			{ onRequestSuccess },
			(response) => {
				if (response) {
					updateSpot(response);
				}
			}
		);

		return () => {
			if (subscriptions) {
				subscriptions.unsubscribe('onRequestSpot');
				subscriptions.unsubscribe('onCarArrived');
				subscriptions.unsubscribe('onCarLeft');
				subscriptions.unsubscribe('onRequestFailed');
				subscriptions.unsubscribe('onRequestSuccess');
			}
		};
	}, [subscriptions]);

	if (!allSpots || !allSpots?.length) {
		return (
			<div className="wrap-content-center">
				<CircularProgress color="secondary" />
			</div>
		);
	}

	return (
		<div className={rootClasses.root}>
			<Header
				open={sideMenuIsOpen}
				onSideMenuChange={(sideMenu: boolean) =>
					setSideMenuOpen(sideMenu)
				}
			/>
			<SideMenu
				open={sideMenuIsOpen}
				onSideMenuChange={(sideMenu: boolean) =>
					setSideMenuOpen(sideMenu)
				}
			/>
			<main
				className={clsx(rootClasses.content, {
					[rootClasses.contentShift]: sideMenuIsOpen,
				})}
			>
				<div className={rootClasses.drawerHeader} />
				<ParkingContent />
			</main>
		</div>
	);
};

export default Parking;
