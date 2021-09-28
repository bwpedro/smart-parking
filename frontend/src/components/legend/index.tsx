import React from 'react';
import useStyles from './styles';

const colors = {
	FREE: 'green',
	IN_NEGOTIATION: '#FF8C00',
	WAITING_FOR_PARKING: 'blue',
	BUSY: '#c70000',
	NO_DATA: 'grey',
};

const Legend: React.FC = () => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.title}>
				<div
					style={{
						backgroundColor: colors.FREE,
					}}
					className={classes.square}
				/>{' '}
				LIVRE
			</div>
			<div className={classes.title}>
				<div
					style={{
						backgroundColor: colors.IN_NEGOTIATION,
					}}
					className={classes.square}
				/>{' '}
				EM NEGOCIAÇÃO
			</div>
			<div className={classes.title}>
				<div
					style={{
						backgroundColor: colors.WAITING_FOR_PARKING,
					}}
					className={classes.square}
				/>{' '}
				AGUARDANDO ESTACIONAR
			</div>
			<div className={classes.title}>
				<div
					style={{
						backgroundColor: colors.BUSY,
					}}
					className={classes.square}
				/>{' '}
				OCUPADO
			</div>
			<div className={classes.title}>
				<div
					style={{
						backgroundColor: colors.NO_DATA,
					}}
					className={classes.square}
				/>{' '}
				SEM DADOS
			</div>
		</>
	);
};

export default Legend;
