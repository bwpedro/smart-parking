import React from 'react';
import useStyles from './styles';

type Properties = {
	name: string;
	children: React.ReactNode;
};

const Sector: React.FC<Properties> = ({ name, children }) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.title}>{name}</div>
			<div
				style={{
					gridGap: 12,
				}}
				className={classes.children}
			>
				{children}
			</div>
		</div>
	);
};

export default Sector;
