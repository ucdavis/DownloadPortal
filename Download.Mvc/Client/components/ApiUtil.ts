declare var Promise: any;

export function checkStatus(response) {
    // The Promise returned from fetch() won’t reject on HTTP error statuses
    // So instead lets check for good statuses and reject the rest
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}