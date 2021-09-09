import axios from "axios";
import { useEffect, useState, useReducer } from "react";

//Creating useDataApi Hook
const useDataApi = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);

	// useReducer
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		data: initialData,
	});

	useEffect(() => {
		let didCancel = false;
		const fetchData = async () => {
			dispatch({ type: "FETCH_INIT" });
			try {
				const result = await axios(url);
				console.log(result);
				!didCancel &&
					dispatch({ type: "FETCH_SUCCESS", payload: result.data });
			} catch (error) {
				!didCancel && dispatch({ type: "FETCH_FAILURE" });
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
		case "FETCH_INIT":
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case "FETCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case "FETCH_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error("Fetch Error");
	}
};

export default useDataApi;
