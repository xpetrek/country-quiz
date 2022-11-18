import { Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { useCurrent, useRound } from '../../hooks/useGame';
import { useLanguage, useTranslation } from '../../hooks/useTranslation';
import theme from '../../utils/theme';
import { Game } from '../../utils/types';

type Props = {
	giveScore: (earnedScore: number) => void;
	checkAnswer: (answer: string | number) => number;
	alterGame: (newGame: Partial<Game>) => void;
};

const PopulationAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	alterGame
}: Props) => {
	const [populationGuess, setPopulationGuess] = useState<number>(0);
	const t = useTranslation();
	const round = useRound();
	const { isQuestionAnswered, answersColors } = useCurrent();
	const [l] = useLanguage();

	return (
		<>
			<Grid item xs={10}>
				<TextField
					fullWidth
					required
					id="filled-basic"
					label={t('take_guess')}
					variant="filled"
					type="number"
					onChange={e => setPopulationGuess(Number.parseInt(e.target.value))}
					sx={{ display: isQuestionAnswered ? 'none' : 'inherit' }}
				/>
			</Grid>
			<Grid item xs={2} alignItems="stretch" style={{ display: 'flex' }}>
				<Button
					fullWidth
					sx={{
						height: '100%',
						bgcolor: answersColors[0],
						display: isQuestionAnswered ? 'none' : 'inherit'
					}}
					variant="outlined"
					onClick={() => {
						if (populationGuess > 0) {
							const color = answersColors;
							const earnedScore = checkAnswer(populationGuess);
							if (earnedScore) {
								giveScore(earnedScore);
								color[0] = theme.palette.success.main;
							} else {
								color[0] = theme.palette.error.main;
							}
							alterGame({
								current: {
									isQuestionAnswered: true,
									isQuestionCorrect: !!earnedScore,
									answersColors: color
								}
							});
						}
					}}
				>
					{t('submit')}
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography
					variant="h6"
					align="center"
					sx={{
						display: !isQuestionAnswered ? 'none' : 'inherit',
						border: 'solid',
						borderColor: answersColors[0]
					}}
				>
					{t('thePopulationOf')} {round.country.name[l]} {t('is')}{' '}
					{round.country.population.toLocaleString(l)}. {t('yourGuessWas')}{' '}
					{populationGuess.toLocaleString(l)}. {t('you_earned')}{' '}
					{checkAnswer(populationGuess)} {t('out_of')} {round.currentQuestion}{' '}
					{t('points')}.
				</Typography>
			</Grid>
		</>
	);
};

export default PopulationAnswer;
