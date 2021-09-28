import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
	createStyles({
		'@global': {
			'html,body': {
				boxSizing: 'border-box',
				fontFamily: `'Roboto', sans-serif`,
				height: '100%',
				width: '100%',
				margin: 0,
				backgroundColor: '#f2f3f3',
			},
			'html,body,#root,#app': {
				overflow: 'hidden',
				height: '100%',
			},
			'#root': {
				width: '100%',
				height: '100%',
			},
			'.wrap-content-center': {
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			},
			'.container': {
				[theme.breakpoints.down('sm')]: {
					padding: 16,
				},
				width: '100%',
				height: 'calc(100% - 64px)',
				padding: '8px 32px 8px 32px',
				boxSizing: 'border-box',
				overflowY: 'auto',
			},
			'.title': {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'row',
				borderBottom: `1px solid #C3C3C3`,
			},
			h5: {
				fontSize: 25,
				margin: '16px 16px',
			},
		},
	})
);
