import { getMethod, postMethod, deleteMethod } from 'api/methods';
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

// Fetch country data given a country id
export const fetchCountryData = async (country_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/2/countries/` + country_id;
    const headers = getGeneralHeader();
    const error = 'Error fetching country data: ' + country_id;
    return await getMethod(backend_url, headers, error);
};

// Delete a country from the user's passport
export const deleteCountry = async (country_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/2/countries/` + country_id;
    const headers = getGeneralHeader();
    const error = 'Error deleting country: ' + country_id;
    return await deleteMethod(backend_url, {}, headers, error);
}