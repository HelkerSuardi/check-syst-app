'use strict';

import * as jwt from 'jsonwebtoken';

const ID_KEY = process.env.ID_KEY || '_chs_id_';
const TOKEN_KEY = process.env.TOKEN_KEY || '_chs_token_';
const USERNAME_KEY = process.env.USERNAME_KEY || '_chs_username_';
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const login = data => {
    const { token, name, id, role } = data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(ID_KEY, id);
    localStorage.setItem('_chs_role', role);
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ID_KEY);
    localStorage.removeItem('_chs_role');
    sessionStorage.clear();
};

const getId = () => {
    return localStorage.getItem(ID_KEY);
};

const getRole = () => {
  return localStorage.getItem('_chs_role')
}

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const getUsername = () => {
    return localStorage.getItem(USERNAME_KEY);
};

const hasRole = role => {
  const token = getToken()

  if (!token) {
    return false
  }

  const roles = jwt.decode(token, JWT_TOKEN_SECRET).role

  if (!roles) {
    return false
  }

  return roles.indexOf(role) !== -1
}

const loggedIn = async () => {
    const token = getToken();

    if (!token) {
        return false;
    }
    try {
        return await jwt.verify(token, JWT_TOKEN_SECRET);
    } catch (e) {
        return false;
    }
};

export default {
    login,
    logout,
    loggedIn,
    getId,
    getRole,
    getToken,
    getUsername,
    hasRole
};
