import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			[theme.breakpoints.down('sm')]: {
				width: '100% !important',
				marginLeft: theme.spacing(0),
			},
			height: 300,
			width: '80%',
			paddingTop: 12,
			border: '1px solid #c1c1c1',
			borderRadius: 4,
			overflowX: 'hidden',
			marginLeft: theme.spacing(2),
			boxSizing: 'border-box',
		},
		title: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			borderBottom: '1px solid #c1c1c1',
			paddingBottom: 8,
		},
		children: {
			[theme.breakpoints.down('sm')]: {
				'&:focus': {
					backgroundColor: `${theme.palette.primary.main} !important`,
					color: 'white',
				},
			},
			gridGap: 12,
			width: '100%',
			paddingTop: 36,
			display: 'grid',
			placeItems: 'center',
			gridTemplateColumns: 'auto auto auto auto auto',
		},
	})
);

export default useStyles;
