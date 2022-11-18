import { Button } from '@mui/material';
import { FC } from 'react';

import { useCurrent, useQuestion, useRound } from '../../hooks/useGame';
import { useLanguage } from '../../hooks/useTranslation';
import theme from '../../utils/theme';
import { Country, CountryAnswer, Game } from '../../utils/types';

type Props = {
	giveScore: (earnedScore: number) => void;
	checkAnswer: (answer: string | number) => number;
	alterGame: (newGame: Partial<Game>) => void;
	answer: Country;
	i: number;
};

const ButtonAnswer: FC<Props> = ({
	giveScore,
	checkAnswer,
	alterGame,
	answer,
	i
}: Props) => {
	const round = useRound();
	const question = useQuestion();
	const [l] = useLanguage();
	const { isQuestionAnswered, answersColors } = useCurrent();

	return (
		<Button
			id={answer.key}
			fullWidth
			sx={{
				border: 'solid',
				height: '100%',
				backgroundColor: answersColors[i],
				fontWeight: 'bold',
				WebkitTextStroke: '0.2px black',
				textShadow: '0px 0px 3px black'
			}}
			onClick={e => {
				if (!isQuestionAnswered) {
					const color = answersColors;
					const earnedScore = checkAnswer((e.target as HTMLInputElement).id);
					const isRight = !!earnedScore;
					if (isRight) {
						giveScore(earnedScore);
						color[i] = theme.palette.success.main;
					} else {
						color[i] = theme.palette.error.main;
						color[(question as CountryAnswer).index] =
							theme.palette.success.main;
					}
					alterGame({
						current: {
							isQuestionAnswered: true,
							isQuestionCorrect: isRight,
							answersColors: color
						}
					});
				}
			}}
		>
			{round.currentQuestion === 1 ? answer.name[l] : answer.capital[l]}
		</Button>
	);
};

export default ButtonAnswer;
