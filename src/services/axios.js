import axios from 'axios';
import { API_URL } from '../config/appConfig';

export default axios.create({
  baseURL: API_URL,
});
