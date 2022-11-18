import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#ef66ff',
			light: '#6d1b7b',
			dark: '#ef66ff',
			contrastText: '#000'
		},
		secondary: {
			main: '#ff9100',
			light: '#b26500',
			dark: '#ffa733',
			contrastText: '#fff'
		},
		error: {
			main: '#d8000d'
		},
		success: {
			main: '#158815'
		},
		mode: 'dark'
	}
});

theme.typography.h1 = {
	'fontSize': '2.5rem',
	'@media (min-width:600px)': {
		fontSize: '3.0rem'
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '3.5rem'
	}
};

theme.typography.h2 = {
	'fontSize': '2.0rem',
	'@media (min-width:600px)': {
		fontSize: '2.5rem'
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '3.0rem'
	}
};

theme.typography.h3 = {
	'fontSize': '1.0rem',
	'@media (min-width:600px)': {
		fontSize: '1.5rem'
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '2.5rem'
	}
};

export default theme;
