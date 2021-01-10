const position = [9.43, 51.01];   // Position (Longitude, Latitude)
const zoomlevel = 5; //Zoomstufe

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend"
], function (Map, MapView, FeatureLayer, Legend) {
  const defaultSym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [128, 128, 128, 0.2],
      width: "0.5px"
    }
  };




  const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: defaultSym,
    label: "Inzidenz",
    visualVariables: [
      {
        type: "color",
        field: "cases7_per_100k",
        stops: [
          {
            value: 0,
            color: "#FFFFFF",
            label: "0"
          },
          {
            value: 301,
            color: "#8b0000",
            label: ">300"
          }
        ]
      }
    ]
  };
  var trailheadsLabels = {
    symbol: {
      type: "text",
      color: "#000000",
      haloColor: "#FFFFFF",
      haloSize: "1px",
      font: {
        size: "15px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal"
      }
    },
    labelPlacement: "always-horizontal",
    labelExpressionInfo: {
      expression:
        'return $feature["county"] + " \\n" + $feature["cases7_per_100k_txt"]'
    }
  };
  const povLayer = new FeatureLayer({
    url:
      "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0",
    renderer: renderer,
    labelingInfo: [trailheadsLabels],
    title: "7 Tage Inzidenzen auf 100k Einwohner.",
    popupTemplate: {
      // autocasts as new PopupTemplate()
      title: "{COUNTY}",
      content:
        "{cases7_per_100k_txt} Neu-Infizierte auf 100.000 Einwohner in den letzten 7 Tagen",
      fieldInfos: []

    }
  });

  const map = new Map({
    basemap: "gray-vector",
    layers: [povLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: position,
    zoom: zoomlevel
  });

  view.ui.add(
    new Legend({
      view: view
    }),
    "bottom-left"

  );
});
