import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
	createStyles({
		title: {
			display: 'flex',
			alignItems: 'center',
			marginTop: 10,
		},
		square: {
			height: 20,
			width: 20,
			border: '1px solid transparent',
			marginRight: 6,
		},
	})
);

export default useStyles;
