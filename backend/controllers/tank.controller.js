import tankService from "../services/tank.service";

let TankController = {};

//add tank data to firestore
TankController.addTank = async (req, res) => {
  try {
    await tankService.addTank(req.body);
    res.status(200).send({ message: "Tank added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server error occurred while adding tank" });
  }
};

//get all tanks from firestore
TankController.fetchAllTanks = async (req, res) => {
  try {
    let tanks = await tankService.getTanks();
    res.status(200).send(tanks);
  } catch (error) {
    res.status(500).send({ message: "Internal Server error occurred while fetching tanks" });
  }
};
export default TankController;
