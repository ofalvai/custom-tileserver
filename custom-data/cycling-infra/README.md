# Cycling infra custom layer

## Instructions for updating the tileset

Run `query.txt` in Overpass Turbo and get a GeoJSON output.

Using [Mapbox Tilesets CLI](https://docs.mapbox.com/help/tutorials/get-started-mts-and-tilesets-cli):

First, set the `MAPBOX_ACCESS_TOKEN` env var, then:

```
tilesets upload-source ofalvai cycling-infra --replace export.geojson

tilesets update-recipe ofalvai.cycling-infra-tiles recipe.json

tilesets publish ofalvai.cycling-infra-tiles
```