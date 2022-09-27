import { Router } from "express";
import {
  addProperty,
  getPropertiesList,
  getPropertyDetails,
  getRecentProperties,
} from "./controllers";

const routes = Router();

routes.get("/property", getPropertiesList);
routes.get("/property/recent", getRecentProperties);
routes.get("/property/:id", getPropertyDetails);
routes.post("/property", addProperty);

export default routes;
