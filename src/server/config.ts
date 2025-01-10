import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
} from 'axios';

const API_Request = axios.create({
	baseURL: process.env.URL_API,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer',
	},
});

export const API_Request_Code = axios.create({
	baseURL: process.env.URL_API_CODE,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.AUTHORIZATION_CODE}`,
	},
});

export async function useRequest<API_Response>(
	config: AxiosRequestConfig,
	Instance: AxiosInstance = API_Request,
) {
	'use server';
	try {
		const response = await Instance<API_Response>(config);
		console.log('API request success: ', response);
		return {
			status: response.status as number,
			data: response.data as API_Response,
		};
	} catch (exception) {
		const error = exception as AxiosError;
		console.error('API request error: ', error);
		return {
			status: error?.response?.status as number,
			data: error?.response?.data as API_Response,
		};
	}
}

// https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/swagger-ui3#/
// https://developer.nytimes.com/
// https://newsdata.io/
// https://www.dicebear.com/styles/big-ears/#usage
