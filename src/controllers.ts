import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { Property } from "./db/property.schema";
import CalculateMapBound from "./utils/calculateMapBounds";

export async function getPropertiesList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let propertyList = await Property.find()
    .skip(Number(req.query.offset) * Number(req.query.limit))
    .limit(Number(req.query.limit));

  return res.status(200).json({
    pages: Math.ceil((await Property.count()) / Number(req.query.limit)),
    mapBounds: CalculateMapBound(propertyList),
    data: propertyList,
  });
}

export async function getPropertyDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let property = await Property.findById(req.params.id);
    if (property) {
      return res.status(200).json(property);
    }
    return res.status(404).json();
  } catch {
    return res.status(500).json();
  }
}

export async function addProperty(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newProperty = new Property(req.body);
  newProperty.save((err, property) => {
    if (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json({ error: err.errors });
      } else {
        return res.status(400).json();
      }
    } else {
      return res.status(201).json({ property });
    }
  });
}
