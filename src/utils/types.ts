import localization from '../localization';

export type Languages = keyof typeof localization;
export const RoundsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const QuestionsArray = [1, 2, 3] as const;
export type Rounds = typeof RoundsArray[number];
export type Questions = typeof QuestionsArray[number];

const BoundariesArray = ['high', 'medium', 'low'] as const;
export type BoundariesNames = typeof BoundariesArray[number];

export const POPULATION_RANGE_HIGH = 0.1;
export const POPULATION_RANGE_MEDIUM = 0.2;
export const POPULATION_RANGE_LOW = 0.3;

export const NUMBER_OF_ROUNDS = Math.max(...RoundsArray);
export const NUMBER_OF_QUESTIONS = Math.max(...QuestionsArray);
export const MAX_SCORE =
	QuestionsArray.reduce((a, b) => a + b, 0) * NUMBER_OF_ROUNDS; // (1+2+3) * 10

export type Country = {
	key: string;
	population: number;
	name: Record<Languages, string>;
	capital: Record<Languages, string>;
};

export type PopulationAnswer = {
	lower: Record<BoundariesNames, number>;
	upper: Record<BoundariesNames, number>;
};

export type CountryAnswer = {
	index: number;
	countries: Country[];
};

export type QuestionOptions = {
	[1]: CountryAnswer;
	[2]: CountryAnswer;
	[3]: PopulationAnswer;
};

export type Round = {
	options: QuestionOptions;
	currentQuestion: Questions;
	country: Country;
};

export type Game = {
	finished: boolean;
	started: boolean;
	score: number;
	currentRound: Rounds;
	rounds: Record<Rounds, Round>;
	current: {
		isQuestionAnswered: boolean;
		isQuestionCorrect: boolean;
		answersColors: string[];
	};
};
