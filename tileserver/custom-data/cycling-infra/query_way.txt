[out:json];

(
  area["name"="Magyarország"]->.boundaryarea;
  
  // cycleways
  way[highway=cycleway](area.boundaryarea);
  way[bicycle=designated](area.boundaryarea);
  way[cycleway=track](area.boundaryarea);
  way["cycleway:right"=track](area.boundaryarea);
  way["cycleway:left"=track](area.boundaryarea);
  way["cycleway:both"=track](area.boundaryarea);

  // lanes
  way[cycleway=lane](area.boundaryarea);
  way["cycleway:right"=lane](area.boundaryarea);
  way["cycleway:left"=lane](area.boundaryarea);
  way["cycleway:both"=lane](area.boundaryarea);
  
  // shared infra  
  way[cycleway~"share_busway|shared_lane|opposite_lane"](area.boundaryarea);
  way["cycleway:right"~"share_busway|shared_lane"](area.boundaryarea);
  way["cycleway:left"~"share_busway|shared_lane"](area.boundaryarea);
  way["cycleway:both"~"share_busway|shared_lane"](area.boundaryarea);
);

out body;
>;
out skel qt;