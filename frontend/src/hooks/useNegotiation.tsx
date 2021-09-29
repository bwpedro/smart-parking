import { useParking } from 'context/parking';
import { useCallback } from 'react';
import requestFailed from 'requests/requestFailed';
import requestSuccess from 'requests/requestSuccess';
import * as Types from '../api/types';

function useNegotiation(): (spot: Types.RequestSpotInput) => void {
	const { updateLogs } = useParking();

	const negotiate = useCallback(
		(spot: Types.RequestSpotInput) => {
			updateLogs(
				`${new Date().toISOString()}: Requisição vaga ${
					spot.spot
				} recebida para o driver ${spot.driverId ?? 'SEM DRIVER'}`
			);

			setTimeout(() => {
				const acceptNegotiation = Math.random() < 0.85;

				if (acceptNegotiation) {
					void requestSuccess(spot, (error, data) => {
						if (data) {
							updateLogs(
								`${new Date().toISOString()}: Vaga ${
									spot.spot
								} negociada com o driver ${
									spot.driverId ?? 'SEM DRIVER'
								}`
							);
						} else {
							console.error(error);
						}
					});
				} else {
					void requestFailed(spot.spot, (error, data) => {
						if (data) {
							updateLogs(
								`${new Date().toISOString()}: Vaga ${
									spot.spot
								} NÃO negociada com o driver ${
									spot.driverId ?? 'SEM DRIVER'
								}`
							);
						} else {
							console.error(error);
						}
					});
				}
			}, 5000);
		},
		[updateLogs]
	);

	return negotiate;
}

export default useNegotiation;
