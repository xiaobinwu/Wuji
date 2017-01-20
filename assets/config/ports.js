if (__DEV__) {
    window.config = {
        host: 'http://localhost:2618/api',
        currentUser: 'bin'
    };
}

const getApi = (url) => `${window.config.host}/${url}`;

export const CODE_SUCCESS = 200;

export const JOURNAL_LIST = getApi('Job/QueryJobManagerPaging');




