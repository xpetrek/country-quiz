import { Button, Container } from '@mui/material';
import { FC, useCallback } from 'react';

import { useGame, useRound, useCurrent } from '../hooks/useGame';
import { useTranslation } from '../hooks/useTranslation';
import {
	Game,
	NUMBER_OF_QUESTIONS,
	NUMBER_OF_ROUNDS,
	Questions,
	Rounds
} from '../utils/types';

type Props = {
	alterGame: (newGame: Partial<Game>) => void;
};

const NextButton: FC<Props> = ({ alterGame }: Props) => {
	const [game] = useGame();
	const round = useRound();
	const t = useTranslation();
	const { isQuestionCorrect } = useCurrent();

	const setNextQuestionOrRound = useCallback(
		(isRight: boolean) => {
			if (isRight && round.currentQuestion < NUMBER_OF_QUESTIONS) {
				alterGame({
					rounds: {
						...game.rounds,
						[game.currentRound]: {
							...round,
							currentQuestion: (round.currentQuestion + 1) as Questions
						}
					}
				});
			} else {
				if (game.currentRound < NUMBER_OF_ROUNDS) {
					alterGame({ currentRound: (game.currentRound + 1) as Rounds });
				} else {
					alterGame({ finished: true });
				}
			}
		},
		[game]
	);

	return (
		<Container sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
			<Button
				variant="contained"
				onClick={() => {
					setNextQuestionOrRound(isQuestionCorrect);
					alterGame({
						current: {
							isQuestionAnswered: false,
							isQuestionCorrect: false,
							answersColors: ['inherit', 'inherit', 'inherit', 'inherit']
						}
					});
				}}
			>
				{isQuestionCorrect && round.currentQuestion < NUMBER_OF_QUESTIONS
					? t('next_question')
					: game.currentRound === NUMBER_OF_ROUNDS
					? t('evaluate')
					: t('next_round')}
			</Button>
		</Container>
	);
};

export default NextButton;
