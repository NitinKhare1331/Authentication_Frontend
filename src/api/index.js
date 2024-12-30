import axios from '../config/axiosConfig.js'

export const signupRequest = async ({ email, password, username }) => {
    try {
        const response = await axios.post('/user/signup', {
            email,
            password,
            username
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

export const signinRequest = async ({ email, password }) => {
    try {
        const response = await axios.post('/user/signin', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}