import axios from 'axios';

let BaseURL;
if (process.env === 'development') {
	BaseURL = 'http://localhost:8081';
}else{
	BaseURL = 'http://localhost:8081';
};


/*axios.defaults.headers.common['accessToken'] = 123;
axios.defaults.headers.common['projId'] = 213;*/

axios.defaults.headers.timeout=50000;
/*axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';*/

/*axios.defaults.withCredentials=true;*/

export {BaseURL,axios};
