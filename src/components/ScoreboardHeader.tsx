import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useTranslation } from '../hooks/useTranslation';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.primary.contrastText,
	background: theme.palette.primary.main
}));

type Props = {
	requestSort: (key: string) => void;
};

const ScoreboardRow = ({ requestSort }: Props) => {
	const t = useTranslation();
	return (
		<>
			<Grid item xs={5}>
				<Item onClick={() => requestSort('by')}>{t('username')}</Item>
			</Grid>
			<Grid item xs={5}>
				<Item onClick={() => requestSort('date')}>{t('date')}</Item>
			</Grid>
			<Grid item xs={2}>
				<Item onClick={() => requestSort('score')}>{t('score')}</Item>
			</Grid>
		</>
	);
};

export default ScoreboardRow;
