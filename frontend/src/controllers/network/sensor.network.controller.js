import { baseUrl } from "../../constants.js";
import axios from "axios";

let SensorsNetworkController = {};

SensorsNetworkController.fetchLogs = async (req, res) => {
  try {
    let response = await axios.get(`${baseUrl}/api/sensor/logs`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    } else {
      alert("Data Attribute Error");
      // throw new Error("data attribute does not exist");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

SensorsNetworkController.addSensor = async (sensor) => {
  try {
    //sensor must be a map object which matches backend request body

    //sample sensor map object
    // let sesnor = {
    //     location : "Kaduwela",
    //     area : "50 acres"
    // };

    // ------------------------------------------------------------ THESE MAP BODIES MUST MATCH

    //sample backend request body decompositon
    //let {location, area} = req.body;

    //create backend endpoint
    let response = await axios.post(`${baseUrl}/api/sensor/add`, sensor, {
      withCredentials: true,
    });

    //some sort of condition to check in result. Remove if unnecessary
    // if(true)
    // {
    // }
    // else
    // {
    //     throw new Error("hrow unique error here");
    // }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default SensorsNetworkController;
