import axios from 'axios';

const URL = "http://localhost:3000/user";



export default async function GetUsers(filterInfo) {

    const newFilterInfo = {};

    newFilterInfo.page = filterInfo.page;
    newFilterInfo.limit = filterInfo.limit;
    
    if (filterInfo.name != "") {
        newFilterInfo.name = filterInfo.name;
    }
    if (filterInfo.startDate != "") {
        newFilterInfo.startDate = filterInfo.startDate;
    }
    if (filterInfo.endDate != "") {
        newFilterInfo.endDate = filterInfo.endDate;
    }
    if (filterInfo.status != "") {
        newFilterInfo.status = filterInfo.status;
    }

    try {
        const {data} = await axios.post(URL, {
            data: newFilterInfo,
        });
        // return [];
    } catch(error){
        console.log(error);
    }
} 