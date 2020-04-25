import axios from 'axios';
import authService from '../service/auth-service';

const getHeaders = () => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': authService.getToken(),
    };
};

const axiosAuthenticatedInstance = axios.create({
    baseURL: `${process.env.API_URL}/api`,
    transformRequest: [
        function(data, headers) {
            headers['x-access-token'] = authService.getToken();
            return JSON.stringify(data);
        },
    ],
    headers: getHeaders(),
});
axiosAuthenticatedInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // if the error is 401 do logout and redirect to login page
            authService.logout();
        }

        // Do something with response error
        return Promise.reject(error);
    }
);

export { axiosAuthenticatedInstance, axios };

export default ({ Vue }) => {
    Vue.prototype.$axios = axiosAuthenticatedInstance;
};
