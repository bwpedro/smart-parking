/* eslint-disable import/prefer-default-export */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			boxShadow: 'none',
			borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
		},
		appBarShift: {
			width: `calc(100% - ${264}px)`,
			marginLeft: 264,
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		hide: {
			display: 'none',
		},
		logo: {
			width: '172px',
		},
		iconButton: {
			color: '#1D6EB7',
			'&:hover': {
				backgroundColor: `#1D6EB7 !important`,
				color: 'white',
			},
		},
		menu: {
			top: '60px !important',
		},
	})
);
