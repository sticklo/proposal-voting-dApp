import axios from 'axios';

export const API = axios.create({
  baseURL: `${
    process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL
  }/api`,
});
