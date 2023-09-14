import { getMethod, postMethod, deleteMethod, patchMethod } from 'api/methods';
import { getGeneralHeader } from 'api/auth';

// Fetch user's countries
export const fetchUserCountries = async (user_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/${user_id}/countries`;
    const headers = getGeneralHeader();
    const error = 'Error fetching user countries';
    return await getMethod(backend_url, headers, error);
};

// Add new countries to the user's passport
export const addUserCountries = async (countries, user_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/${user_id}/countries/`;
    const headers = getGeneralHeader();
    const error = 'Error fetching user countries';
    return await postMethod(backend_url, countries, headers, error);
};

// Fetch country data given a country id
export const fetchCountryData = async (country_id, user_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/${user_id}/countries/` + country_id;
    const headers = getGeneralHeader();
    const error = 'Error fetching country data: ' + country_id;
    return await getMethod(backend_url, headers, error);
};

// Delete a country from the user's passport
export const deleteCountry = async (country_id, user_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/${user_id}/countries/` + country_id;
    const headers = getGeneralHeader();
    const error = 'Error deleting country: ' + country_id;
    return await deleteMethod(backend_url, {}, headers, error);
};

export const saveCountry = async (country_id, country, user_id) => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/passport/users/${user_id}/countries/` + country_id + '/';
    const headers = getGeneralHeader();
    const error = 'Error saving country: ' + country_id;
    return await patchMethod(backend_url, country, headers, error);
};
