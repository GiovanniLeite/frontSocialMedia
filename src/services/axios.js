import axios from 'axios';
import { API_URL } from '../constants/appConfig';

export default axios.create({
  baseURL: API_URL,
});
