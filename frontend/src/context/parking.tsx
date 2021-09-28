import React, { createContext, useState, useCallback } from 'react';
import * as Types from '../api/types';

interface IParkingContext {
	allSpots: Types.Spot[] | undefined;
	setAllSpots: (spots: Types.Spot[]) => void;
	updateSpot: (spot: Types.Spot) => void;
}

const ParkingContext = createContext<IParkingContext | null>(null);

const ParkingProvider: React.FC = ({ children }) => {
	const [allSpots, setAllSpots] = useState<Types.Spot[] | undefined>();

	const updateSpot = useCallback(
		(spotUpdated) => {
			setAllSpots((previous) =>
				previous?.map((item) =>
					item.spot === spotUpdated.spot ? spotUpdated : item
				)
			);
		},
		[setAllSpots]
	);

	return (
		<ParkingContext.Provider
			value={{
				allSpots,
				setAllSpots,
				updateSpot,
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
