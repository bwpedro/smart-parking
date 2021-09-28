import React, { useMemo } from 'react';
import useStyles from './styles';
import * as Types from '../../api/types';

const colors = {
	FREE: 'green',
	IN_NEGOTIATION: '#FF8C00',
	WAITING_FOR_PARKING: 'blue',
	BUSY: '#c70000',
	NO_DATA: 'grey',
};

function getColorByStatus(status: Types.SpotStaus) {
	if (status) {
		return colors[status];
	}

	return colors.NO_DATA;
}

type Properties = {
	spot: Types.Spot;
	onMouseOver?: (spot: Types.Spot) => void;
	onClick?: (spot: Types.Spot) => void;
};

const Spot: React.FC<Properties> = ({ spot, onMouseOver, onClick }) => {
	const classes = useStyles();

	const isClickable = useMemo(() => spot.status === 'FREE' && onClick, [
		spot,
		onClick,
	]);

	return (
		<div
			onFocus={() => {}}
			onKeyDown={() => {}}
			onClick={() => {
				if (isClickable && onClick) {
					onClick(spot);
				}
			}}
			onMouseOver={() => {
				if (onMouseOver) onMouseOver(spot);
			}}
			className={classes.container}
			style={{
				backgroundColor: getColorByStatus(spot.status),
				cursor: isClickable ? 'pointer' : 'default',
			}}
			key={spot.spot}
		>
			{spot.spot}
		</div>
	);
};

export default Spot;
