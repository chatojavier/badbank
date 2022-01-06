import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import { auth } from '../firebase-config';

//Creating useGetDataApi Hook
const useGetDataApi = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		success: false,
		data: initialData,
	});

	useEffect(() => {
		let didCancel = false;
		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' });
			try {
				const result = await axios(url);
				console.log('useGetDataApi result: ', result);
				!didCancel &&
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (error) {
				!didCancel && dispatch({ type: 'FETCH_FAILURE' });
			}
		};
		initialUrl && fetchData();
		return () => {
			didCancel = true;
		};
	}, [url]);
	return [state, setUrl];
};

// creating usePostDataApi hook
const usePostDataApi = (initialFetchData) => {
	const [fetchData, setFetchData] = useState(initialFetchData);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		success: false,
		data: fetchData.data,
	});

	useEffect(() => {
		let didCancel = false;
		const doFetch = async () => {
			const { url, data } = fetchData;
			dispatch({ type: 'FETCH_INIT' });
			try {
				const result = await axios.post(url, data);
				console.log('usePostDataApi result: ', result);
				!didCancel &&
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (error) {
				!didCancel && dispatch({ type: 'FETCH_FAILURE' });
			}
		};
		fetchData.url && doFetch();
		return () => {
			didCancel = true;
		};
	}, [fetchData]);
	return [state, setFetchData];
};
// creating useUpdateDataApi hook
const useUpdateDataApi = (initialFetchData) => {
	const [fetchData, setFetchData] = useState(initialFetchData);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		success: false,
		data: fetchData.data,
	});

	useEffect(() => {
		let didCancel = false;
		const doFetch = async () => {
			const { url, data } = fetchData;
			dispatch({ type: 'FETCH_INIT' });
			try {
				const result = await axios.patch(url, data);
				console.log('useUpdateDataApi result: ', result);
				!didCancel &&
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (error) {
				!didCancel && dispatch({ type: 'FETCH_FAILURE' });
			}
		};
		fetchData.url && doFetch();
		return () => {
			didCancel = true;
		};
	}, [fetchData]);
	return [state, setFetchData];
};

//Creating useAuthGetDataApi Hook
const useAuthGetDataApi = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		success: false,
		data: initialData,
	});

	useEffect(() => {
		let didCancel = false;
		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' });
			try {
				const idToken = await auth.currentUser.getIdToken();
				const headers = { Authorization: idToken };
				const result = await axios.get(url, { headers });
				console.log('useGetDataApi result: ', result);
				!didCancel &&
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (error) {
				!didCancel && dispatch({ type: 'FETCH_FAILURE' });
			}
		};
		initialUrl && fetchData();
		return () => {
			didCancel = true;
		};
	}, [url]);
	return [state, setUrl];
};

// creating useAuthUpdateDataApi hook
const useAuthUpdateDataApi = (initialFetchData) => {
	const [fetchData, setFetchData] = useState(initialFetchData);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		success: false,
		data: fetchData.data,
	});

	useEffect(() => {
		let didCancel = false;
		const doFetch = async () => {
			const { url, data } = fetchData;
			dispatch({ type: 'FETCH_INIT' });
			try {
				const idToken = await auth.currentUser.getIdToken();
				const headers = { Authorization: idToken };
				const result = await axios.patch(url, data, { headers });
				console.log('useUpdateDataApi result: ', result);
				!didCancel &&
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (error) {
				!didCancel && dispatch({ type: 'FETCH_FAILURE' });
			}
		};
		fetchData.url && doFetch();
		return () => {
			didCancel = true;
		};
	}, [fetchData]);
	return [state, setFetchData];
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
				success: true,
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

export {
	useGetDataApi,
	usePostDataApi,
	useUpdateDataApi,
	useAuthGetDataApi,
	useAuthUpdateDataApi,
};
