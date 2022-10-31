import { IProperty } from "../db/property.schema";

type Bounds = {
  northWest: number[];
  southEast: number[];
};

export default function CalculateMapBound(propertyList: IProperty[]): Bounds {
  var minLat = Number.POSITIVE_INFINITY,
    minLng = Number.POSITIVE_INFINITY;
  var maxLat = Number.NEGATIVE_INFINITY,
    maxLng = Number.NEGATIVE_INFINITY;

  propertyList.forEach((property) => {
    if (Number(property.lat) < minLat) {
      minLat = Number(property.lat);
    }
    if (Number(property.lat) > maxLat) {
      maxLat = Number(property.lat);
    }
    if (Number(property.long) < minLng) {
      minLng = Number(property.long);
    }
    if (Number(property.long) > maxLng) {
      maxLng = Number(property.long);
    }
  });

  return {
    northWest: [minLat, maxLng],
    southEast: [maxLat, minLng],
  };
}
