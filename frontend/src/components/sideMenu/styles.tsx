import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 264,
		flexShrink: 0,
	},
	drawerPaper: {
		width: 264,
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		border: 'none',
		overflow: 'hidden',
		backgroundColor: theme.palette.primary.main,
		'&:hover': {
			overflow: 'auto',
		},
		'&::-webkit-scrollbar': {
			width: '0.4em',
			cursor: 'pointer',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#23405b',
			borderRadius: '12px',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			backgroundColor: 'rgba(0,0,0,.4)',
		},
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '8px 8px',
		justifyContent: 'space-between',
	},
	text: {
		width: '80%',
		color: '#1D6EB7',
		padding: theme.spacing(0, 1),
	},
	icon: {
		width: '20%',
		color: '#1D6EB7',
	},
	listItemColor: {
		color: '#1D6EB7',
	},
	listSelectedItemColor: {
		color: '#E6E7E8',
	},
	selected: {
		backgroundColor: '#1D6EB7 !important',
	},
	root: {
		paddingTop: '0px',
	},
	clinic: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'flex-start',
		color: '#1D6EB7',
		padding: theme.spacing(0, 1),
	},
	iconButton: {
		color: '#1D6EB7',
		'&:hover': {
			backgroundColor: `#1D6EB7 !important`,
			color: 'white',
		},
	},
	listItem: {
		'&:hover': {
			backgroundColor: '#DDDEDF',
		},
	},
}));

export default useStyles;
