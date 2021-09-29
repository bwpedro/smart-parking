import React, { createContext, useState, useCallback } from 'react';
import * as Types from '../api/types';

interface IParkingContext {
	allSpots: Types.Spot[] | undefined;
	setAllSpots: (spots: Types.Spot[]) => void;
	updateSpot: (spot: Types.Spot) => void;
	logs: string[];
	updateLogs: (log: string) => void;
}

const ParkingContext = createContext<IParkingContext | null>(null);

const ParkingProvider: React.FC = ({ children }) => {
	const [allSpots, setAllSpots] = useState<Types.Spot[] | undefined>();
	const [logs, setLogs] = useState<string[]>([]);

	const updateSpot = useCallback(
		(spotUpdated: Types.Spot) => {
			setAllSpots((previous) =>
				previous?.map((item) =>
					item.spot === spotUpdated.spot ? spotUpdated : item
				)
			);
		},
		[setAllSpots]
	);

	const updateLogs = useCallback(
		(log: string) => {
			setLogs((previous) => [log, ...previous]);
		},
		[setLogs]
	);

	return (
		<ParkingContext.Provider
			value={{
				allSpots,
				setAllSpots,
				updateSpot,
				logs,
				updateLogs,
			}}
		>
			{children}
		</ParkingContext.Provider>
	);
};

export function useParking(): IParkingContext {
	const value = React.useContext(ParkingContext);

	if (!value) {
		throw new Error('Error creating context');
	}

	return value;
}

export default ParkingProvider;
