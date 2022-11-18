import { Container, Typography } from '@mui/material';
import { FC } from 'react';

import { getScore, getCurrentRound } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';
import { MAX_SCORE, NUMBER_OF_ROUNDS } from '../utils/types';

type Props = {
	username?: string;
};

const ShowScore: FC<Props> = ({ username }) => {
	const score = getScore();
	const currentRound = getCurrentRound();
	const t = useTranslation();

	return (
		<Container
			maxWidth="md"
			component="main"
			color="primary"
			sx={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			<Typography variant="h3" sx={{ p: 2, textAlign: 'left' }}>
				{t('round_text')} {currentRound}/{NUMBER_OF_ROUNDS}{' '}
			</Typography>
			<Typography variant="h3" sx={{ p: 2, flexGrow: '1', textAlign: 'right' }}>
				{username ? `${username}'s` : t('score_text_before')}
				{t('score_text_after')}
				{score}/{MAX_SCORE}
			</Typography>
		</Container>
	);
};

export default ShowScore;
