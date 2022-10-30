[out:json];

(
  area["name"="Budapest"]->.boundaryarea;
  
  // bicycle parking
  node[amenity=bicycle_parking][access!~"no|private"](area.boundaryarea);
  way[amenity=bicycle_parking][access!~"no|private"](area.boundaryarea);
  area[amenity=bicycle_parking][access!~"no|private"](area.boundaryarea);
  
  node[amenity=drinking_water](area.boundaryarea);
  node[amenity=bicycle_repair_station](area.boundaryarea);
);



out body;
>;
out skel qt;