import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useSentimentContext } from "../context/SentimentContext"; // adjust path as needed

// Define sentiment colors
const sentimentColors: Record<string, am5.Color> = {
  positive: am5.color(0x43a047), // green
  neutral: am5.color(0xffeb3b),  // yellow
  negative: am5.color(0xe53935), // red
  default: am5.color(0xbdbdbd),  // gray for missing data
};

const MapChart: React.FC = () => {
   const chartRef = useRef<HTMLDivElement>(null);
    const { sentimentData, mode, setSelectedCountry } = useSentimentContext();

    console.log("Sentiment Data:", sentimentData);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current!);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        wheelX: "zoom",
        wheelY: "zoom",
        projection: am5map.geoMercator(),
      })
    );

    const zoomControl = am5map.ZoomControl.new(root, {});
    chart.set("zoomControl", zoomControl);
    

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"], // Exclude Antarctica
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });
    

    // Color countries by sentiment
    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const iso = target.dataItem?.dataContext.id;
      const sentiment = sentimentData?.[iso];

      if (mode === "overall") {
        if (sentiment && sentimentColors[sentiment]) {
          return sentimentColors[sentiment];
        }
        return sentimentColors.default;
      }

      // For specific sentiment categories, highlight only those, gray out others
      if (sentiment === mode) {
        return sentimentColors[sentiment];
      }
      return sentimentColors.default;
    });

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      stroke: am5.color(0xffffff),
      strokeWidth: 1,
    });

    polygonSeries.mapPolygons.template.adapters.add("tooltipText", (text, target) => {
      const iso = target.dataItem?.dataContext.id;
      const sentiment = sentimentData?.[iso];
      if (!sentiment) {
        return `{name}\nNo sentiment data`;
      }
      return `{name}\nSentiment: ${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}`;
    });

    // Click interaction for detailed breakdown
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const iso = ev.target.dataItem?.dataContext.id;
      if (iso) {
        setSelectedCountry(iso);
      }
    });

    // Clean up chart on unmount
    return () => {
      root.dispose();
    };
  }, [mode, sentimentData, setSelectedCountry]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default MapChart;