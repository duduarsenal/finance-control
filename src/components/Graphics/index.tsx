import { GraphicsBarProps, GraphicsPieProps } from "@typings";
import { cn, currencyFormatPT } from "@utils";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export function GraphicsBar({ className, colTypes, ganhos, gastos }: GraphicsBarProps) {

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
      },
    },
    xaxis: {
      categories: colTypes,
      labels: {
        style: {
          colors: "#E1E1E1",
          fontFamily: "Nunito",
          fontWeight: "semibold",
          fontSize: "16px",
          cssClass: "col-types",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#E1E1E1",
          fontFamily: "Nunito",
          fontWeight: "semibold",
          fontSize: "14px",
          cssClass: "row-types",
        },
        formatter(val) {
          return "R$ " + val;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: "#80808080",
    },
    series: [
      {
        name: "Gastos",
        data: gastos,
        color: "#FF2C2C",
      },
      {
        name: "Ganhos",
        data: ganhos,
        color: "#5bb450",
      },
    ],
    tooltip: {
      enabled: true,
      fillSeriesColor: true,
      cssClass: "texte",
      style: {
        fontSize: "14px",
        fontFamily: "Nunito",
      },
      x: {
        show: false,
      },
      custom(options) {
        return currencyFormatPT(
          options.series[options.seriesIndex][options.dataPointIndex]
        )
          .toString()
          .replace(",", "");
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className={cn(className)}>
      <Chart options={options} series={options.series} width={700} type="bar" />
    </div>
  );
}

export function GraphicsPie({className, data}: GraphicsPieProps) {

  const options: ApexOptions = {
    labels: data.map((label) => label.label),
    series: data.map((serie) => serie.value),
    colors: data.map((color) => color.color),
    tooltip: {
      y: {
        formatter(val) {
          return `R$ ${val}`
        }
      },
      hideEmptySeries: true,
      cssClass: "tooltip-donut"
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "60px"
        }
      }
    },
    stroke: {
      colors: ['#1F1F1F80']
    },
    legend: {
      show: false
    }
  };

  return (
    <div
      className={cn(className)}>
      <Chart options={options} series={options.series} width={450} type="donut" />
    </div>
  );
}
