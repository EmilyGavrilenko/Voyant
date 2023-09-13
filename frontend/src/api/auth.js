// Return the general header for methods not requiring an authenticated, signed in user
export function getGeneralHeader() {
    return {
        'Content-Type': 'application/json',
    };
}
