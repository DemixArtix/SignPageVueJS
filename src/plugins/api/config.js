export default {
  // url: 'http://localhost:8081',
  url: 'https://floating-lake-48678.herokuapp.com',
  headers: {
    'Authorization': localStorage.getItem('token'),
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
}