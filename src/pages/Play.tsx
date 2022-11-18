import { FC } from 'react';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { GameLayout } from '../components';

type Props = {
	username?: string;
};

const Play: FC<Props> = ({ username }) => {
	const t = useTranslation();
	usePageTitle(t('game'));
	return <GameLayout username={username} />;
};

export default Play;
