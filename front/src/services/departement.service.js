import axios from "axios";

const API_URL = "http://localhost:5000/api/departement/";

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