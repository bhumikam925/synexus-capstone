export function debounce(func, delay) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}
export async function fetchWithRetry(
    url,
    options = {},
    retries = 3,
    backoff = 500
) {

    for (let i = 0; i < retries; i++) {

        try {

            const response = await fetch(url, options);

            if (response.ok) {
                return response;
            }

            throw new Error(
                `Request failed with status ${response.status}`
            );

        } catch (error) {

            if (i === retries - 1) {
                throw error;
            }

            await new Promise(
                resolve => setTimeout(resolve, backoff)
            );

            backoff *= 2;
        }
    }
}
