import { Box, Button, Typography } from '@mui/material';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { Link } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

type Props = {
	username?: string | null;
};

const Home = ({ username }: Props) => {
	const t = useTranslation();
	usePageTitle(t('home'));

	return (
		<>
			<Box>
				<Typography variant="h1" fontWeight="bold">
					{t('country_quiz')}
				</Typography>
			</Box>
			<Box>
				<Typography variant="h3">
					{t('welcome')}
					{username ? `, ${username}` : ''}
				</Typography>
			</Box>

			<Typography variant="h5">{t('pretext')}</Typography>
			<Typography variant="h4">{t('rules_title')}</Typography>
			<Typography variant="body1">{t('rules_about')}</Typography>
			<Typography variant="h5">{t('rules_first_title')}</Typography>
			<Typography variant="body1">{t('rules_first')}</Typography>
			<Typography variant="h5">{t('rules_second_title')}</Typography>
			<Typography variant="body1">{t('rules_second')}</Typography>
			<Typography variant="h5">{t('rules_third_title')}</Typography>
			<Typography variant="body1">{t('rules_third')}</Typography>
			<Typography variant="body1">{t('rules_fourth')}</Typography>
			<Button
				component={Link}
				to="/play"
				variant="contained"
				size="large"
				disableElevation
				startIcon={<EmojiFlagsIcon />}
				endIcon={<EmojiFlagsIcon />}
			>
				{t('start_game')}
			</Button>
		</>
	);
};

export default Home;
