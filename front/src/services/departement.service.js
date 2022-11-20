import axios from "axios";



const ip = "192.168.0.100"
const API_URL = "http://"+ ip+ ":5000/api/";

const getDepartementChartById = async (id, tel) => {
    try {
        return await axios.get(API_URL + "departement/0" + id + "/" + tel);
    } catch (err) {
        console.error(err);
    }
};

const DepartementService = {
    getDepartementChartById
}

export default DepartementService;