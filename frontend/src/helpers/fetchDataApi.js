import axios from 'axios';

// creating get data api
const getDataApi = async (url, headers, setState) => {
	setState &&
		setState({
			...state,
			isLoading: true,
			isError: false,
		});
	try {
		const result = await axios.get(url, headers && { headers });
		console.log('getDataApi result: ', result);
		setState &&
			setState({
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				dataToReceive: result.data,
			});
		return result;
	} catch (error) {
		setState &&
			setState({
				...state,
				isLoading: false,
				isError: true,
			});
		console.error(error.message);
	}
};

// creating Post data api
const postDataApi = async (url, dataToSend, headers, setState) => {
	setState &&
		setState({
			...state,
			isLoading: true,
			isError: false,
		});
	try {
		const result = await axios.post(
			url,
			dataToSend,
			headers && { headers }
		);
		console.log('postDataApi result: ', result);
		setState &&
			setState({
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				dataToReceive: result.data,
			});
		return result;
	} catch (error) {
		setState &&
			setState({
				...state,
				isLoading: false,
				isError: true,
			});
		console.error(error.message);
	}
};

// creating Patch data api
const patchDataApi = async (url, dataToSend, headers, setState) => {
	setState &&
		setState({
			...state,
			isLoading: true,
			isError: false,
		});
	try {
		const result = await axios.patch(
			url,
			dataToSend,
			headers && { headers }
		);
		console.log('postDataApi result: ', result);
		setState &&
			setState({
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				dataToReceive: result.data,
			});
		return result;
	} catch (error) {
		setState &&
			setState({
				...state,
				isLoading: false,
				isError: true,
			});
		console.error(error.message);
	}
};

export { getDataApi, postDataApi, patchDataApi };
