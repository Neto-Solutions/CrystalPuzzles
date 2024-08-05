import { useLayoutEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, setUser, User as Profile } from '@entities/user';
import { MainRouter } from '@shared/routes';
import { useDispatch } from 'react-redux';
import User from '@shared/api/user';

export default function RouterProvider() {
	const { role } = useSelector(selectUser);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		if (!role) {
			User.get()
				.then((res) => {
					dispatch(setUser(new Profile(res)));
				})
				.catch(() => null);
		}
	}, []);

	return <Router router={createBrowserRouter(MainRouter(role))} />;
}
