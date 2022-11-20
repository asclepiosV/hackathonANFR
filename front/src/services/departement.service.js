import axios from "axios";



const ip = "172.24.16.174"
const API_URL = "http://"+ ip+ ":5000/api/departement/";

const getDepartementChartById = async (id) => {
    try {
        return await axios.get(API_URL + "0" + id);
    } catch (err) {
        console.error(err);
    }

};

const DepartementService = {
    getDepartementChartById
}

export default DepartementService;