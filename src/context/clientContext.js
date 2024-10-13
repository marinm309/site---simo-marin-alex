import { createContext } from 'react';
import axios from "axios"

const serverURL = 'http://127.0.0.1:8000'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: serverURL,
})

const ClientContext = createContext(client);

export { ClientContext, client };