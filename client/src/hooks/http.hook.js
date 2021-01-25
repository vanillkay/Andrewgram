import {useCallback, useState} from "react";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const useHttp = () => {
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = {}, headers = {}) => {
        setLoading(true);
        try {

            const token = getCookie("XSRF-TOKEN");


            const init = method === 'GET' ? {
                method,
                headers: {...headers, 'Content-Type': 'application/json', 'x-csrf-token': token}
            } : {
                method,
                body: await JSON.stringify(body),
                headers: {...headers, 'Content-Type': 'application/json', 'x-csrf-token': token}
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


    return {
        loading, request,
    }
}