if (__DEV__) {
    window.config && (window.config = {
        context: 'http://localhost:2618/api',
        currentUser: 'bin'
    });
}

const getApi = (url) => `${window.config.context}/${url}`;

export const CODE_SUCCESS = 200;

export const JOURNAL_LIST = getApi('Job/QueryJobManagerPaging');




