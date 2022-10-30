[out:json];

area["name"="Magyarország"]->.boundaryarea;
  
rel[route=bicycle](area.boundaryarea);
(
  way[highway!=cycleway][bicycle!=designated][!"cycleway"][!"cycleway:left"][!"cycleway:right"][!"cycleway:both"](r);
  way[cycleway=no](r); // re-add previously excluded ways

  way[cycleway=opposite](area.boundaryarea); // it's not infra (unlike opposite_lane)
);
out geom;
