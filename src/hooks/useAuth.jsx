import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContexts/AuthContext';

const useAuth = () => {
    const authData = use(AuthContext);
    return authData
};

export default useAuth;