import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Button, Container, Grid, Toolbar } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

import LanguageSwitch from './LanguageSwitch';
import RestartButton from './RestartButton';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const user = useLoggedInUser();
	const loc = useLocation();

	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="md">
					<Toolbar disableGutters>
						<Grid
							container
							sx={{
								gap: '1',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<Grid item xs={4} sx={{ textAlign: 'left' }}>
								{loc.pathname === '/play' ? (
									<RestartButton />
								) : (
									<Button color="primary" component={Link} to="/play">
										{t('play')}
									</Button>
								)}
								<Button color="primary" component={Link} to="/scoreboard">
									{t('scoreboard')}
								</Button>
							</Grid>

							<Grid item xs={4} sx={{ textAlign: 'center' }}>
								<Button
									component={Link}
									to="/"
									variant="outlined"
									size="large"
									sx={{ my: 'auto' }}
								>
									{t('country_quiz')}
								</Button>
							</Grid>

							<Grid
								item
								xs={4}
								sx={{ textAlign: 'right', flexDirection: 'row' }}
							>
								{!user ? (
									<Button color="primary" component={Link} to="/login">
										{t('login')}
									</Button>
								) : (
									<Button color="primary" onClick={signOut}>
										{t('logout')}
									</Button>
								)}
								<LanguageSwitch />
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};

export default Layout;
