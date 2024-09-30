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

// Get solution data by solutionId
SolutionsController.getSolutionsDataById = async (req, res) => {
  try {
    let solutionId = req.params.solutionId;
    let solutionsData = await SolutionsService.getSolutionsDataById(solutionId);
    res.status(200).send(solutionsData);
  } catch (error) {
    console.error("Error getting solution data from firestore : ", error);
    res.status(500).send(error);
  }
};

// get solution data by solutionName
SolutionsController.getSolutionsDataByName = async (req, res) => {
  try {
    let solutionName = req.params.solutionName;
    let solutionsData = await SolutionsService.getSolutionsDataByName(solutionName);
    res.status(200).send(solutionsData);
  } catch (error) {
    console.error("Error getting solution data from firestore : ", error);
    res.status(500).send(error);
  }
};

// Delete solution data by solutionName
SolutionsController.deleteSolutionsDataByName = async (req, res) => {
  try {
    let solutionName = req.params.solutionName;
    await SolutionsService.deleteSolutionsDataByName(solutionName);
    res.status(200).send("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting solution data from firestore : ", error);
    res.status(500).send(error);
  }
};

// Update solution data by solutionName
SolutionsController.updateSolutionsDataByName = async (req, res) => {
  try {
    let solutionName = req.params.solutionName;
    let data = req.body;
    await SolutionsService.updateSolutionsDataByName(solutionName, data);
    res.status(200).send("Data updated successfully");
  } catch (error) {
    console.error("Error updating solution data in firestore : ", error);
    res.status(500).send(error);
  }
};

export default SolutionsController;