import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	formControl: {
		height: 82,
		width: 320,
	},
	btnFormControl: {
		marginTop: 16,
	},
	formRoot: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
	},
	loginPage: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	formContainer: {
		width: '30%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	formLogin: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	alertContainer: {
		width: '100%',
		marginTop: 16,
		paddingBottom: 8,
	},
	logoContainer: {
		paddingBottom: 26,
	},
	newUser: {
		fontSize: '15px',
		color: '#1D6EB7',
		margin: 0,
		cursor: 'pointer',
		'&:hover': {
			color: 'grey',
		},
	},
});

export default useStyles;
