import { GraphicsBarProps } from "@typings";
import { cn, currencyFormatPT } from "@utils";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
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
          name: "Ganhos",
          data: ganhos,
          color: "#5bb450",
        },
        {
          name: "Gastos",
          data: gastos,
          color: "#FF2C2C",
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
  
    const [width, setWidth] = useState<number>(630)
  
    useEffect(() => {
      const resizeFunc = () => {
        setWidth(document.body.clientWidth > 1400 ? 630 : 600)
      }
  
      window.addEventListener('resize', resizeFunc)
      return () => window.removeEventListener('resize', resizeFunc)
    }, [])
  
    return (
      <div className={cn("flex items-center justify-center w-full h-full", className)}>
        <Chart options={options} series={options.series} width={width} type="bar" />
      </div>
    )
  }