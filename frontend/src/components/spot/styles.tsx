import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			width: 50,
			height: 50,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white',
			marginBlockStart: '1em',
			marginBlockEnd: '1em',
			marginInlineStart: 0,
			marginInlineEnd: 0,
		},
	})
);

export default useStyles;
