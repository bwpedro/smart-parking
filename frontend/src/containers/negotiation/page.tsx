import React, { useEffect, useState } from 'react';
import { useParking } from 'context/parking';
import { useSubscription } from 'context/subscription';
import { onRequestSpot } from 'graphql/subscriptions';
import requestSuccess from 'requests/requestSuccess';
import requestFailed from 'requests/requestFailed';
import * as Types from '../../api/types';

const Negotiation: React.FC = () => {
	const subscriptions = useSubscription();
	const { allSpots } = useParking();

	const [logs, setLogs] = useState(['']);

	function onNegotiate({ status, veihicle, ...spot }: Types.Spot) {
		setLogs((previous) => [
			`${new Date().toISOString()}: Requisição vaga ${
				spot.spot
			} recebida para o driver ${spot.driverId ?? 'SEM DRIVER'}`,
			...previous,
		]);

		const spotToBeNegotiated = allSpots?.find(
			(currentSpot) => currentSpot.spot === spot.spot
		);

		if (spotToBeNegotiated?.status === 'FREE') {
			const acceptNegotiation = Math.random() < 0.85;

			if (acceptNegotiation) {
				void requestSuccess(
					spot as Types.RequestSpotInput,
					(error, data) => {
						if (data) {
							setLogs((previous) => [
								`${new Date().toISOString()}: Vaga ${
									spot.spot
								} negociada com o driver ${
									spot.driverId ?? 'SEM DRIVER'
								}`,
								...previous,
							]);
						} else {
							console.error(error);
						}
					}
				);
			} else {
				void requestFailed(spot.spot, (error, data) => {
					if (data) {
						setLogs((previous) => [
							`${new Date().toISOString()}: Vaga ${
								spot.spot
							} NÃO negociada com o driver ${
								spot.driverId ?? 'SEM DRIVER'
							}`,
							...previous,
						]);
					} else {
						console.error(error);
					}
				});
			}
		} else {
			void requestFailed(spot.spot, (error, data) => {
				if (data) {
					setLogs((previous) => [
						`${new Date().toISOString()}: a vaga ${
							spot.spot
						} não estava livre para negociação.`,
						...previous,
					]);
				} else {
					console.error(error);
				}
			});
		}
	}

	useEffect(() => {
		if (!subscriptions) {
			return;
		}

		subscriptions.subscribe<Types.Spot>({ onRequestSpot }, (response) => {
			if (response) {
				setTimeout(() => {
					onNegotiate(response);
				}, 5000);
			}
		});

		return () => {
			if (subscriptions) {
				subscriptions.unsubscribe('onRequestSpot');
			}
		};
	}, [subscriptions]);

	return (
		<div className="container">
			<div className="title">
				<h5>Negociação</h5>
			</div>
			<div>
				{logs.map((log) => (
					<p key={log}>{log}</p>
				))}
			</div>
		</div>
	);
};

export default Negotiation;
