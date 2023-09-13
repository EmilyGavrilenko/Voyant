import { getMethod, postMethod } from 'api/methods';
import { getGeneralHeader } from 'api/auth';

// Fetch user's countries
export const fetchUserCountries = async () => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/2/countries`;
    const headers = getGeneralHeader();
    const error = 'Error fetching user countries';
    return await getMethod(backend_url, headers, error);
};

// Add new countries to the user's passport
export const addUserCountries = async (countries) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/2/countries/`;
    const headers = getGeneralHeader();
    const error = 'Error fetching user countries';
    return await postMethod(backend_url, countries, headers, error);
};
