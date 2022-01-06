import { useEffect, useState, useReducer } from 'react';

//Creating useGetDataApi Hook
const useUrlApi = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		data: initialData,
	});

	//load img function promise
	const loadImg = async (src) =>
		new Promise((resolve, reject) => {
			const img = new Image();
			img.src = src;
			img.onload = resolve;
			img.onerror = reject;
		});

	useEffect(() => {
		let didCancel = false;
		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' });
			try {
				const result = await fetch(url);
				!didCancel &&
					dispatch({ type: 'FETCH_SUCCESS', payload: result.url });
			} catch (error) {
				!didCancel && dispatch({ type: 'FETCH_FAILURE' });
			}
		};
		fetchData();
		return () => {
			didCancel = true;
		};
	}, [url]);
	return [state, setUrl];
};

//creating the Data Fetch callback for useReducer
const dataFetchReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case 'FETCH_FAILURE':
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error('Fetch Error');
	}
};

export default useUrlApi;
