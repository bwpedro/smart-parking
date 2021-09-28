import React from 'react';
import { useParking } from 'context/parking';
import { Grid } from '@material-ui/core';
import Sector from 'components/sector';
import Spot from 'components/spot';
import Legend from 'components/legend';
import useStyles from './styles';

const ParkingActivity: React.FC = () => {
	const { allSpots } = useParking();
	const classes = useStyles();

	return (
		<div className="container">
			<div className="title">
				<h5>Estacionamento</h5>
			</div>
			<div className={classes.container}>
				<Grid container spacing={1}>
					<Grid item sm={6} xs={12}>
						<Sector name="SETOR A">
							{allSpots?.slice(0, 10).map((spot) => (
								<Spot spot={spot} />
							))}
						</Sector>
					</Grid>
					<Grid item sm={6} xs={12}>
						<Legend />
					</Grid>

					<Grid item sm={6} xs={12}>
						<Sector name="SETOR B">
							{allSpots?.slice(10, 20).map((spot) => (
								<Spot spot={spot} />
							))}
						</Sector>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default ParkingActivity;
