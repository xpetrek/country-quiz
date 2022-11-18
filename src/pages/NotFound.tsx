import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const NotFound = () => {
	const t = useTranslation();
	usePageTitle(t('not_found'));

	return (
		<>
			<ErrorIcon color="secondary" sx={{ fontSize: 150 }} />
			<Typography color="secondary" variant="h2">
				{t('not_found')}
			</Typography>
		</>
	);
};

export default NotFound;
