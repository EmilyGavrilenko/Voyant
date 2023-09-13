import { getMethod } from 'api/methods';
import { getGeneralHeader } from 'api/auth';

// Fetch user's countries
export const fetchUserCountries = async () => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/2/countries`;
    const headers = getGeneralHeader();
    const error = 'Error fetching userp countries';
    return await getMethod(backend_url, headers, error);
};
