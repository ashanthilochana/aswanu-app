import SolutionsService from "../services/solutions.service.js";

let SolutionsController = {};

// Add solution data to firestore
SolutionsController.addSolutionsData = async (req, res) => {
  try {
    let data = req.body;
    await SolutionsService.addSolutionsData(data);
    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error("Error saving solution data to firestore : ", error);
    res.status(500).send(error);
  }
};

// Get solution data from firestore
SolutionsController.getSolutionsData = async (req, res) => {
  try {
    let solutionsData = await SolutionsService.getSolutionsData();
    res.status(200).send(solutionsData);
  } catch (error) {
    console.error("Error getting solution data from firestore : ", error);
    res.status(500).send(error);
  }
};

export default SolutionsController;