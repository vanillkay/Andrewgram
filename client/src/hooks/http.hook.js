import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = {}, headers = {}) => {
        setLoading(true);
        try {

            const init = method === 'GET' ? {
                method,
                headers: {...headers, 'Content-Type': 'application/json'}
            } : {
                method,
                body: await JSON.stringify(body),
                headers: {...headers, 'Content-Type': 'application/json'}
            };

            const response = await fetch(url, {...init});

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }, [])

    const clearError = useCallback(() => setError(null),[]);

    return {
        loading, request, error, clearError
    }
}