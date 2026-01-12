import axios from 'axios';

const URL = "http://localhost:3000/user";


export default async function GetUsers(filterInfo) {
    try {
        // const {data} = await axios.post(URL, {
        //     data: filterInfo,
        // });
        return [];
    } catch(error){
        console.log(error);
    }
} 