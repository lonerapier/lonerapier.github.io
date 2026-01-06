import { QuartzTransformerPlugin } from "../types"
import { Root, Code } from "mdast"
import { visit } from "unist-util-visit"
import { JSResource } from "../../util/resources"
// @ts-ignore
import plotlyScript from "../../components/scripts/plotly.inline"

/*
allows static json or javascript for dynamic data
{
  "data": [
    {
      "x": [1, 2, 3, 4],
      "y": [12, 9, 15, 12],
      "type": "scatter",
      "mode": "lines+markers",
      "line": { "color": "#17becf" }
    }
  ],
  "layout": {
    "title": {
      "text": "Custom Styled Chart",
      "font": { "family": "Courier New, monospace", "size": 24 }
    },
    "xaxis": { "title": "Time (s)" },
    "yaxis": { "title": "Voltage (mV)" },
    "paper_bgcolor": "rgba(0,0,0,0)", 
    "plot_bgcolor": "rgba(0,0,0,0)"
  },
  "config": {
    "responsive": true,
    "displayModeBar": true, 
    "displaylogo": false
  }
}
---
var x = [];
for (var i = 0; i < 500; i ++) {
    x[i] = Math.random();
}

var trace = {
    x: x,
    type: 'histogram',
};

// You must return the object containing data (and optional layout/config)
return {
    data: [trace],
    layout: { title: "Random Histogram" }
};
*/

export const Plotly: QuartzTransformerPlugin = () => {
  return {
    name: "Plotly",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, _file) => {
            visit(tree, "code", (node: Code) => {
              if (node.lang === "plotly") {
                node.data = {
                  hProperties: {
                    className: ["plotly"],
                  },
                }
              }
            })
          }
        },
      ]
    },
    externalResources() {
      const js: JSResource[] = [
        {
          script: plotlyScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
          moduleType: "module",
        },
      ]
      return { js }
    },
  }
}

