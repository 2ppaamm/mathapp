import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Assuming axios for HTTP requests
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BACKEND_URL } from '@env';

export const validateToken = async (token) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/validateToken`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.status === 200; // True if token is valid
    } catch (error) {
        console.error('Token validation failed:', error);
        return false;
    }
};

export const refreshToken = async (oldToken) => {
    try {
        const response = await axios.post(`${API_URL}/refreshToken`, {
            token: oldToken
        });
        return response.data.token; // Returns new token
    } catch (error) {
        console.error('Token refreshing failed:', error);
        throw new Error('Unable to refresh token');
    }
};

export const fetchUserData = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/loginInfo`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Returns user data
    } catch (error) {
        console.error('Fetching user data failed:', error);
        throw new Error('Unable to fetch user data');
    }
};
