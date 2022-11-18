import {
	useContext,
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useState
} from 'react';

import localization from '../localization';
import { Languages } from '../utils/types';

type LocalizationKeys = keyof typeof localization[Languages];
type LanguageState = [Languages, Dispatch<SetStateAction<Languages>>];

const LanguageContext = createContext<LanguageState>(undefined as never);

export const LanguageProvider: FC = ({ children }) => {
	const languageState = useState<Languages>('en');
	return (
		<LanguageContext.Provider value={languageState}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = () => {
	const [language] = useContext(LanguageContext);
	return (key: LocalizationKeys) => localization[language][key];
};
