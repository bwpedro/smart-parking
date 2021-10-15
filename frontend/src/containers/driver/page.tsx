import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParking } from 'context/parking';
import { format, formatISO, addHours } from 'date-fns';
import useSnackbar from 'hooks/useSnackbar';
import { useSubscription } from 'context/subscription';
import { onRequestFailed, onRequestSuccess } from 'graphql/subscriptions';
import Sector from 'components/sector';
import Spot from 'components/spot';
import Legend from 'components/legend';
import requestSpot from 'requests/requestSpot';
import * as Types from '../../api/types';
import useStyles from './styles';

const Driver: React.FC = () => {
	const classes = useStyles();
	const subscriptions = useSubscription();
	const showMessage = useSnackbar();
	const { currentUser, allSpots } = useParking();

	const driverId = currentUser?.driverId ?? '';

	function onRequestSpot({ status, veihicle, ...spot }: Types.Spot) {
		showMessage('Requisitando vaga...', 'info');

		const today = new Date();

		const input: Types.RequestSpotInput = {
			...spot,
			driverId,
			startTime: format(today, 'kk:mm'),
			endTime: format(addHours(today, 1), 'kk:mm'),
			date: formatISO(today, { representation: 'date' }),
			price: 10,
		};

		void requestSpot(input, (error, data) => {
			if (data) {
				showMessage('Aguarde a negociação.', 'info');
			} else if (error) {
				showMessage('Ocorreu um erro na requisição.', 'error');
			}
		});
	}

	useEffect(() => {
		if (!subscriptions) {
			return;
		}

		subscriptions.subscribeWithLimit<Types.Spot>(
			{ onRequestFailed },
			{ driverId },
			(response) => {
				if (response) {
					showMessage(
						'Vaga não negociada. Tente outra vaga.',
						'error'
					);
				}
			}
		);

		subscriptions.subscribeWithLimit<Types.Spot>(
			{ onRequestSuccess },
			{ driverId },
			(response) => {
				if (response) {
					showMessage('Vaga negociada com sucesso!', 'success');
				}
			}
		);

		return () => {
			if (subscriptions) {
				subscriptions.unsubscribe('onRequestFailed');
				subscriptions.unsubscribe('onRequestSuccess');
			}
		};
	}, [subscriptions, showMessage]);

	return (
		<div className="container">
			<div className="title">
				<h5>{`Motorista ${driverId}`}</h5>
			</div>
			<div className={classes.container}>
				<Grid container spacing={1}>
					<Grid item sm={6} xs={12}>
						<Sector name="SETOR A">
							{allSpots?.slice(0, 10).map((spot) => (
								<Spot
									key={spot.spot}
									onClick={onRequestSpot}
									spot={spot}
								/>
							))}
						</Sector>
					</Grid>
					<Grid item sm={6} xs={12}>
						<Legend />
					</Grid>
					<Grid item sm={6} xs={12}>
						<Sector name="SETOR B">
							{allSpots?.slice(10, 20).map((spot) => (
								<Spot
									key={spot.spot}
									onClick={onRequestSpot}
									spot={spot}
								/>
							))}
						</Sector>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Driver;
