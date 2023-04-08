import axios from 'axios';

const ajax = axios.create({
  baseURL: `/`,
});

export default ajax;
