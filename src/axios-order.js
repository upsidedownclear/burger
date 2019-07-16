import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-react-playground.firebaseio.com/'
});

export default instance;
