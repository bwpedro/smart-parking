import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const themeProperties = {
	palette: {
		common: {
			black: '#151617',
		},
		primary: {
			main: '#E6E7E8',
			light: '#F2F3F3',
		},
		secondary: {
			main: '#1D6EB7',
			light: '#F2F3F3',
		},
		error: {
			main: '#D32F2F',
		},
	},
	overrides: {
		MuiTableCell: {
			root: {
				padding: '8px 16px',
			},
		},
	},
};

const defaultTheme = createMuiTheme(themeProperties, ptBR);

export default defaultTheme;
