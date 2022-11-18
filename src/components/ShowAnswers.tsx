import { Container, Grid } from '@mui/material';
import { FC, useCallback } from 'react';

import { useGame, useQuestion, useRound } from '../hooks/useGame';
import { CountryAnswer, Game } from '../utils/types';

import ButtonAnswer from './Answers/ButtonAnswer';
import PopulationAnswer from './Answers/PopulationAnswer';

type Props = {
	alterGame: (newGame: Partial<Game>) => void;
};

const ShowAnswers: FC<Props> = ({ alterGame }: Props) => {
	const [game] = useGame();
	const round = useRound();
	const question = useQuestion();

	const giveScore = useCallback(
		(earnedScore: number) => {
			alterGame({
				score: game.score + earnedScore
			});
		},
		[game]
	);

	const checkAnswer = useCallback(
		(answer: string | number): number => {
			if (typeof answer === 'number') {
				if (
					answer <= round.options[3].upper.high &&
					answer >= round.options[3].lower.high
				) {
					return 3;
				} else if (
					answer <= round.options[3].upper.medium &&
					answer >= round.options[3].lower.medium
				) {
					return 2;
				} else if (
					answer <= round.options[3].upper.low &&
					answer >= round.options[3].lower.low
				) {
					return 1;
				}
				return 0;
			}
			if (answer === round.country.key) {
				return round.currentQuestion;
			}
			return 0;
		},
		[round]
	);

	return (
		<Container
			maxWidth="md"
			component="main"
			sx={{
				display: 'flex',
				gap: 1,
				pt: 3
			}}
		>
			<Grid container spacing={2}>
				{round.currentQuestion === 3 ? (
					<PopulationAnswer
						giveScore={giveScore}
						checkAnswer={checkAnswer}
						alterGame={alterGame}
					/>
				) : (
					(question as CountryAnswer).countries.map((answer, i) => (
						<Grid item xs={6} key={i}>
							<ButtonAnswer
								giveScore={giveScore}
								checkAnswer={checkAnswer}
								alterGame={alterGame}
								answer={answer}
								i={i}
							/>
						</Grid>
					))
				)}
			</Grid>
		</Container>
	);
};

export default ShowAnswers;
