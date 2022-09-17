import { Router } from "express";
import {
  addProperty,
  getPropertiesList,
  getPropertyDetails,
  updateProperty,
} from "./controllers";

const routes = Router();

routes.get("/property", getPropertiesList);
routes.get("/property/:id", getPropertyDetails);
routes.post("/property", addProperty);
routes.put("/property/:id", updateProperty);

export default routes;
