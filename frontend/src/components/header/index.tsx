import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { useStyles } from './styles';

const Header: React.FC<IAppHeaderProperties> = ({ open, onSideMenuChange }) => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<AppBar
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						disableRipple
						classes={{ root: classes.iconButton }}
						color="inherit"
						aria-label="open drawer"
						onClick={() => onSideMenuChange(!open)}
						edge="start"
						className={clsx(
							classes.menuButton,
							open && classes.hide
						)}
					>
						<Menu />
					</IconButton>
					<IconButton
						color="inherit"
						aria-label="icon"
						onClick={() => {
							history.push('/parking');
						}}
					>
						<img
							className={classes.logo}
							src="https://www.smartparking.ipb.pt/images/logo.png"
							alt="Medcloud"
						/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
