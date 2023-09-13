// Constructor to send a GET request
export const getMethod = async (backend_url, headers, error, returnFirst) => {
    if (!headers) return [];

    return await fetch(backend_url, {
        method: 'GET',
        headers: headers,
    })
        .then(async (res) => {
            try {
                let data = await res.json();
                // console.log('data', data)

                if (res.status === 200) {
                    if (returnFirst && data.length > 0) {
                        return data[0];
                    }
                    return data;
                } else {
                    console.error(error + ': ' + data.msg);
                    return null;
                }
            } catch (err) {
                if (res.status === 404) {
                    console.error(`${error}: Backend url not found. ${res.url}`);
                    return null;
                } else {
                    console.error(error);
                    console.error(err);
                    return null;
                }
            }
        })
        .catch((err) => {
            console.error(error, err);
            return null;
        });
};

// Constructor to send a POST request
export const postMethod = async (backend_url, body, headers, error, returnData) => {
    if (!headers) return false;

    return await fetch(backend_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    })
        .then(async (res) => {
            try {
                let data = await res.json();
                if (res.status === 204) {
                    // HTTP 204 No Content success status (no matches)
                    return {};
                }
                if (res.status === 200 || res.status === 201) {
                    return returnData ? data : true;
                } else {
                    console.error(
                        error +
                            ': ' +
                            (typeof data.msg === 'string' ? data.msg : data.sqlMessage ?? data.msg?.sqlMessage)
                    );
                    return false;
                }
            } catch (err) {
                if (res.status === 404) {
                    console.error(`${error}: Backend url not found. ${res.url}`);
                    return false;
                } else {
                    console.error(error);
                    console.error(err);
                    return false;
                }
            }
        })
        .catch((err) => {
            console.error(error);
            console.error(err);
            return false;
        });
};

export const deleteMethod = async (backend_url, headers, error) => {
    if (!headers) return false;
    return await fetch(backend_url, {
        method: 'DELETE',
        headers: headers,
    })
        .then(async (res) => {
            try {
                let data = await res.json();
                if (res.status === 204) {
                    // HTTP 204 No Content success status (no matches)
                    return false;
                }
                if (res.status === 200) {
                    return true;
                } else {
                    console.error(
                        error +
                            ': ' +
                            (typeof data.msg === 'string' ? data.msg : data.sqlMessage ?? data.msg?.sqlMessage)
                    );
                    return false;
                }
            } catch (err) {
                if (res.status === 404) {
                    console.error(`${error}: Backend url not found. ${res.url}`);
                    return false;
                } else {
                    console.error(error, err);
                    return false;
                }
            }
        })
        .catch((err) => {
            console.error(error, err);
            return false;
        });
};
