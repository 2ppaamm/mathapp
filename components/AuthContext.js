import Reactimport, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BACKEND_URL } from '@env';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState(null);

    const discovery = {
        authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
        tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
        revocationEndpoint: `https://${AUTH0_DOMAIN}/oauth/revoke`,
    };

    const [request, response, promptAsync] = useAuthRequest({
        clientId: AUTH0_CLIENT_ID,
        redirectUri: makeRedirectUri({ useProxy: true }),
        responseType: ResponseType.IdToken,
        scopes: ['openid', 'profile', 'email'],
        extraParams: { nonce: 'uniqueNonce' },
    }, discovery);

    const authenticate = useCallback(() => {
        console.log ('Authenticating');
        promptAsync({ useProxy: true });
    }, [promptAsync]);

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            console.log ('here is id_token:', id_token);
            AsyncStorage.setItem('userToken', id_token);
            fetchData(id_token);
        }
    }, [response]);

    const fetchData = async (token) => {
        try {
            const response = await fetch(`${BACKEND_URL}/loginInfo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                setTracks(data.tracks);
                console.log('here is tracks data:', data.tracks);
                AsyncStorage.setItem('userData', JSON.stringify(data.user));
                AsyncStorage.setItem('trackData', JSON.stringify(data.tracks));
            } else if (response.status === 401) {
                authenticate();
                console.log(data.user);
            } else {
                throw new Error(`Failed to fetch data: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch user and track data.');
            console.error('Fetch Data Error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, tracks, setUser, setTracks, authenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };

