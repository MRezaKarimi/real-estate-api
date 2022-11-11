import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { Property } from "./db/property.schema";
import CalculateMapBound from "./utils/calculateMapBounds";

export async function getPropertiesList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const offset = Number(req.query.offset ?? 1);
  const limit = Number(req.query.limit ?? 10);

  let query = {};

  if (req.query.ids != null) {
    query = {
      _id: { $in: JSON.parse(req.query.ids as string) },
    };
  }

  if (req.query.city != null) {
    query = {
      ...query,
      city: {
        $regex: req.query.city,
        $options: "i",
      },
    };
  }

  if (req.query.northWest && req.query.southEast) {
    const northWest = JSON.parse(req.query.northWest as string);
    const southEast = JSON.parse(req.query.southEast as string);

    query = {
      ...query,
      lat: {
        $gte: southEast[0],
        $lte: northWest[0],
      },
      long: { $gte: northWest[1], $lte: southEast[1] },
    };
  }

  let propertyList = await Property.find(query)
    .skip((offset - 1) * limit)
    .limit(limit);

  return res.status(200).json({
    pages: Math.ceil((await Property.find(query).count()) / limit),
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

export async function getRecentProperties(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let property = await Property.find().sort({ $natural: -1 }).limit(9);
  return res.status(200).json(property);
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
