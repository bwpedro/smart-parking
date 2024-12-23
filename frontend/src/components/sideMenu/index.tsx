import {
	Drawer,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	Close,
	LocalParking,
	DirectionsCar,
	Autorenew,
} from '@material-ui/icons';
import { useParking } from 'context/parking';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './styles';

const items = [
	{
		path: '/parking',
		text: 'Estacionamento',
		icon: <LocalParking />,
		auth: 'admin',
	},
	{
		path: '/driver',
		text: 'Motorista',
		icon: <DirectionsCar />,
		auth: 'driver',
	},
	{
		path: '/logs',
		text: 'Logs',
		icon: <Autorenew />,
		auth: 'admin',
	},
];

const SideMenu: React.FC<ISideMenuProperties> = ({
	open,
	onSideMenuChange,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const { pathname } = useLocation();
	const { currentUser } = useParking();
	const routePath = `/${pathname.split('/')[1]}`;

	const [selectedIndex, setSelectedIndex] = useState(
		routePath !== '/'
			? items.findIndex((item) => item.path === routePath)
			: 0
	);

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div>
				<div className={classes.drawerHeader}>
					<div className={classes.clinic}>Smart Parking</div>
					<IconButton
						disableRipple
						classes={{ root: classes.iconButton }}
						onClick={(): void => {
							if (onSideMenuChange) {
								onSideMenuChange(!open);
							}
						}}
					>
						<Close />
					</IconButton>
				</div>
				{items.map((item, index) => {
					if (currentUser.role !== item.auth) {
						return null;
					}

					return (
						<ListItem
							key={item.path}
							component="a"
							href={item.path}
							autoFocus
							selected={selectedIndex === index}
							classes={{
								selected: classes.selected,
								button: classes.listItem,
							}}
							onClick={(event: React.MouseEvent) => {
								event.preventDefault();
								setSelectedIndex(index);
								history.push(item.path);
							}}
							button
						>
							<ListItemIcon
								className={
									selectedIndex === index
										? classes.listSelectedItemColor
										: classes.listItemColor
								}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								className={
									selectedIndex === index
										? classes.listSelectedItemColor
										: classes.listItemColor
								}
							>
								{item.text}
							</ListItemText>
						</ListItem>
					);
				})}
			</div>
		</Drawer>
	);
};

export default SideMenu;
