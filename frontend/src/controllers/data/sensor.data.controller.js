import SensorsNetworkController from "../network/sensor.network.controller.js";

let SensorDataController = {};

SensorDataController.getDataByLocation = async (location) => {

    function filterByLocation(log){
        if(!log.data || !log.data.Sensors || !log.data.Sensors[location])
        {
            return false;
        }
        return true;
    }

    try {
        let logs = await SensorsNetworkController.fetchLogs();
        let filteredLogs = logs.filter(filterByLocation);
        let formattedLogs = [];
        filteredLogs.forEach(log => {
            formattedLogs.push(
                log.data.Sensors[location]
            )
        });
        console.log(formattedLogs);
    } catch (error) {
        console.error(error);
    }
}

SensorDataController.addSensor = async (
    //sensor form data
    //either a map, or all args
)  => {
    try {

        //either take a map as argument or create a map from arguments
        let sensor = {};

        //passing map
        let result = await SensorsNetworkController.addSensor(sensor);

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
    }
};

export default SensorDataController;