import axios from "axios";

const ip = "http://localhost";
const API_URL = ip + ":5000/api/";

const getDepartementChartById = async (id, tel, fast) => {
  try {
    return await axios.get(
      API_URL + "departement?numero=0" + id + "&tel=" + tel + "&fast=" + fast
    );
  } catch (err) {
    console.error(err);
  }
};

const getDepartementTemp = async (id, tel, fast, dept) => {
  try {
    return await axios.get(
      API_URL +
        "bande?num=" +
        id +
        "&tel=" +
        tel +
        "&fast=" +
        fast +
        "&departement=" +
        dept
    );
  } catch (err) {
    console.error(err);
  }
};

const DepartementService = {
  getDepartementChartById,
  getDepartementTemp,
};

export default DepartementService;
