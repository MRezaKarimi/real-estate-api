import { Router } from "express";
import {
  addProperty,
  getPropertiesList,
  getPropertyDetails,
} from "./controllers";

const routes = Router();

routes.get("/property", getPropertiesList);
routes.get("/property/:id", getPropertyDetails);
routes.post("/property", addProperty);

export default routes;
