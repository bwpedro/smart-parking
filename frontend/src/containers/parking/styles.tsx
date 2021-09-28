import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
	createStyles({
		root: {
			display: 'flex',
			height: '100%',
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			...theme.mixins.toolbar,
			justifyContent: 'flex-end',
		},
		content: {
			flex: 'auto',
			width: `calc(100% - ${264}px)`,
			flexGrow: 1,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: -264,
			borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		},
	})
);
