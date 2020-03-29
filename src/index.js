import './index.less';


const baseUrl = 'http://localhost:3000'

fetch(baseUrl + '/api/react/login').then(response => response.json)
                    .then(data => console.log('data', data))

fetch('/user').then(response => response.json)
.then(data => console.log('data1', data))