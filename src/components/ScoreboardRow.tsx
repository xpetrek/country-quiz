import { FC } from 'react';
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { GameSession } from '../utils/firebase';
import { useLanguage } from '../hooks/useTranslation';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	border: 'solid',
	borderWidth: 'thin',
	color: theme.palette.primary.main,
	background: theme.palette.primary.contrastText
}));

const ScoreboardRow: FC<GameSession> = ({ by, date, score }) => {
	const username = by.split('@')[0];
	const [l] = useLanguage();
	return (
		<>
			<Grid item xs={5}>
				<Item>{username}</Item>
			</Grid>

			<Grid item xs={5}>
				<Item>
					{`${date.toDate().toLocaleDateString(l)}, ${date
						.toDate()
						.toLocaleTimeString(l)}`}
				</Item>
			</Grid>
			<Grid item xs={2}>
				<Item>
					{score.score} / {score.maxScore}
				</Item>
			</Grid>
		</>
	);
};

export default ScoreboardRow;
