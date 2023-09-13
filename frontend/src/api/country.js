import { getMethod } from 'api/methods';
import { getGeneralHeader } from 'api/auth';

// Fetch all countries
export const fetchCountries = async () => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/countries`;
    const headers = getGeneralHeader();
    const error = 'Error fetching countries';
    return await getMethod(backend_url, headers, error);
}