import { Button, Container, Typography } from '@mui/material';
import { CreateTypes } from 'canvas-confetti';
import { FC, useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { getScore, useGame } from '../hooks/useGame';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useTranslation } from '../hooks/useTranslation';
import { MAX_SCORE } from '../utils/types';

type Props = {
	username?: string;
};

const EndScreen: FC<Props> = ({ username }) => {
	const score = getScore();
	const user = useLoggedInUser();
	const t = useTranslation();
	const [, setGame] = useGame();

	const refAnimationInstance = useRef(null);

	const getInstance = useCallback(instance => {
		refAnimationInstance.current = instance;
		fire();
	}, []);

	const makeShot = useCallback((particleRatio, opts) => {
		refAnimationInstance.current &&
			(
				refAnimationInstance as unknown as React.MutableRefObject<CreateTypes>
			).current({
				...opts,
				origin: { y: 0.7 },
				particleCount: Math.floor(1 + 20 * score * particleRatio)
			});
	}, []);

	const fire = useCallback(() => {
		//decay: how much outward will it shoot
		//spread: angle of perimeter the explosion creates
		//scalar: size of the individual confetti
		//startVelocity: how fast will confetti comes to decay distance
		makeShot(2.0, {
			startVelocity: 35,
			decay: 0.97,
			spread: 220,
			scalar: 0.8,
			ticks: 350
		});

		makeShot(1.35, {
			spread: 360,
			decay: 0.91,
			scalar: 0.8,
			ticks: 250
		});

		makeShot(0.35, {
			spread: 360,
			decay: 0.81,
			scalar: 0.8,
			gravity: 1.1,
			ticks: 180
		});
	}, [makeShot]);

	return (
		<Container
			maxWidth="md"
			component="main"
			sx={{
				display: 'flex',
				height: '20vh',
				flexDirection: 'column',
				textAlign: 'center',
				pb: 10,
				gap: 1
			}}
		>
			<Typography variant="h1">
				{' '}
				{t('congratulations')} {user?.displayName}
			</Typography>
			<Typography variant="h2">
				{' '}
				{username ? `${username}'s` : t('score_text_before')}
				{t('score_text_after')} {score}/{MAX_SCORE}
			</Typography>

			<Container sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					onClick={() => {
						setGame(prevGame => ({
							...prevGame,
							...{ finished: true, started: false }
						}));
					}}
					variant="contained"
					size="large"
					disableElevation
					startIcon={<RestartAltIcon />}
				>
					{' '}
					{t('restart_game')}{' '}
				</Button>
			</Container>

			<ReactCanvasConfetti
				refConfetti={getInstance}
				style={{
					position: 'fixed',
					pointerEvents: 'none',
					width: '100%',
					height: '100%',
					top: 0,
					left: 0
				}}
			/>
		</Container>
	);
};

export default EndScreen;
