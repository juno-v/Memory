import axios from 'axios';

const verbose = false; // turns on and off console.logs

export const sendFileToServer = file => {
    const data = new FormData();
    data.append('file', file);
    axios.post('api/post/image', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': file.type,
    }})
    .then(response => {
        verbose 
        window.location.reload();
    })
    .catch(error => {
        verbose && console.log('error uploading file: ', error);
    })
}
