import * as _ from 'lodash';
import { addDoc, Timestamp } from 'firebase/firestore';
import {
	Dispatch,
	FC,
	useState,
	createContext,
	SetStateAction,
	useContext,
	useEffect
} from 'react';

import data from '../data.json';
import {
	Game,
	Country,
	Round,
	Rounds,
	RoundsArray,
	QuestionsArray,
	MAX_SCORE,
	QuestionOptions,
	POPULATION_RANGE_HIGH,
	POPULATION_RANGE_MEDIUM,
	POPULATION_RANGE_LOW,
	BoundariesNames,
	NUMBER_OF_ROUNDS
} from '../utils/types';
import { gameSessionsCollection } from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

type GameState = [Game, Dispatch<SetStateAction<Game>>];

const GameContext = createContext<GameState>(undefined as never);
const countries: Country[] = data as Country[];

export const GameProvider: FC = ({ children }) => {
	const [game, setGame] = useState<Game>({
		finished: false,
		started: true,
		score: 0,
		currentRound: 1,
		rounds: generateRounds(),
		current: {
			isQuestionAnswered: false,
			isQuestionCorrect: false,
			answersColors: ['inherit', 'inherit', 'inherit', 'inherit']
		}
	});
	const user = useLoggedInUser();

	useEffect(() => {
		if (game.finished && game.started) {
			addDoc(gameSessionsCollection, {
				by: user?.email ?? 'Anonymous',
				date: Timestamp.now(),
				score: {
					maxScore: MAX_SCORE,
					score: game.score
				}
			});
		} else if (game.finished && !game.started) {
			setGame({
				currentRound: 1,
				finished: false,
				rounds: generateRounds(),
				score: 0,
				current: {
					isQuestionAnswered: false,
					isQuestionCorrect: false,
					answersColors: ['inherit', 'inherit', 'inherit', 'inherit']
				},
				started: true
			});
		}
	}, [game.finished, game.started]);

	return (
		<GameContext.Provider value={[game, setGame]}>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);

export const useRound = () => {
	const [game] = useContext(GameContext);
	return game.rounds[game.currentRound];
};

export const useQuestion = () => {
	const round = useRound();
	return round.options[round.currentQuestion];
};

export const getScore = (): number => {
	const [game] = useContext(GameContext);
	return game.score;
};

export const getCurrentRound = (): number => {
	const [game] = useContext(GameContext);
	return game.currentRound;
};

export const useCurrent = (): {
	isQuestionAnswered: boolean;
	isQuestionCorrect: boolean;
	answersColors: string[];
} => {
	const [game] = useContext(GameContext);
	return game.current;
};

const generateRounds = (): Record<Rounds, Round> => {
	const rounds: Partial<Record<Rounds, Round>> = {};
	const roundCountries = _.sampleSize(countries, NUMBER_OF_ROUNDS);

	for (const round of RoundsArray) {
		const options: Partial<QuestionOptions> = {};
		let countryIndex = -1;
		const roundCountry = roundCountries[round - 1];

		for (const question of QuestionsArray) {
			if (question === 3) {
				const { lower, upper } = initializeBoundaries(roundCountry);

				options[question] = {
					lower,
					upper
				};
			} else {
				const randomCountries = _.shuffle([
					...pickRandomCountriesProps(roundCountry),
					roundCountry
				]);
				countryIndex =
					randomCountries.findIndex(country => country === roundCountry) ??
					countryIndex;

				options[question] = {
					index: countryIndex,
					countries: randomCountries
				};
			}
		}

		rounds[round] = {
			options: options as QuestionOptions,
			currentQuestion: 1,
			country: roundCountry
		};
	}

	return rounds as Record<Rounds, Round>;
};

const initializeBoundaries = (country: Country) => {
	const lower: Record<BoundariesNames, number> = {
		high: Math.round((1 - POPULATION_RANGE_HIGH) * country.population),
		medium: Math.round((1 - POPULATION_RANGE_MEDIUM) * country.population),
		low: Math.round((1 - POPULATION_RANGE_LOW) * country.population)
	};
	const upper: Record<BoundariesNames, number> = {
		high: Math.round((1 + POPULATION_RANGE_HIGH) * country.population),
		medium: Math.round((1 + POPULATION_RANGE_MEDIUM) * country.population),
		low: Math.round((1 + POPULATION_RANGE_LOW) * country.population)
	};
	return { lower, upper };
};

const pickRandomCountriesProps = (roundCountry: Country): Country[] =>
	_.sampleSize(
		countries.filter(country => country !== roundCountry),
		3
	);
