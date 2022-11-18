import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Country Quiz`;
	}, [title]);
};

export default usePageTitle;
