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
          fontFamily: "Nunito, sans-serif",
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
          fontFamily: "Nunito, sans-serif",
          fontWeight: "semibold",
          fontSize: "14px",
          cssClass: "row-types",
        },
        formatter(val) {
          return currencyFormatPT(val);
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
      cssClass: "tooltip-bar",
      style: {
        fontSize: "14px",
        fontFamily: "Nunito",
      },
      x: {
        show: false,
      },
      custom(options) {
        return "Total: " + currencyFormatPT(options.series[options.seriesIndex][options.dataPointIndex])
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className={cn("flex items-center justify-center w-full h-full", className)}>
      <Chart options={options} series={options.series} width={700} type="bar" />
    </div>
  );
}

export function GraphicsPie({className, data}: GraphicsPieProps) {

  const options: ApexOptions = {
    labels: data.map((label) => label.label),
    series: data.map((serie) => serie.value),
    colors: data.map((color) => color.color),
    dataLabels: {
      style: {
        colors: ["#0F0F0F"],
        fontWeight: "bold",
        fontSize: "14px"
      },
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      y: {
        formatter(val) {
          if(val === 3141592653589793) return "Nenhum item registrado"
          else return currencyFormatPT(val)
        }
      },
      hideEmptySeries: true,
      cssClass: "tooltip-donut",
      style: {
        fontSize: '14px'
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "60px"
        }
      }
    },
    yaxis: {
      show: false
    },
    stroke: {
      colors: ['#1F1F1F80'],
      width: 2
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
