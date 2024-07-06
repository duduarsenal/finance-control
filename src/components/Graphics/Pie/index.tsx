import { GraphicsPieProps } from "@typings";
import { cn, currencyFormatPT } from "@utils";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

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