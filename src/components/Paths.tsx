import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Play from '../pages/Play';
import NotFound from '../pages/NotFound';
import Scoreboard from '../pages/Scoreboard';

const Paths = () => {
	const user = useLoggedInUser();
	const username = user?.email ? user.email.split('@')[0] : undefined;

	return (
		<Routes>
			<Route path="/" element={<Home username={username} />} />
			<Route path="/scoreboard" element={<Scoreboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/play" element={<Play username={username} />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Paths;
