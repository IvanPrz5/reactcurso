import { API_URL } from "@/services/config";
import { monthNames } from "@/utils/Meses";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const GraficaMxnTimb: React.FC = () => {
  
  type Items = {
    isrTimbrado: string | number,
    isrNoTimbrado: string | number,
    mes: number
  }

  const [chartData, setChartData] = useState({
    series: [{
      name: '',
      data: []
    }],
    options: {}
  });

  useEffect(() => {
    axios
      .get(API_URL + "/XmlRecibido/timbrado")
      .then((response) => {
        setChartData({
          series: [
            {
              name: "ISR TIMBRADO",
              data: response.data.map((item: Items) => item?.isrTimbrado),
            },
            {
              name: "ISR NO TIMBRADO",
              data: response.data.map((item: Items) => item?.isrNoTimbrado),
            },
          ],
          options: {
            theme: {
              mode: 'dark',
            },
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              // stackType: '100%'
            },
            responsive: [{
              breakpoint: 600,
              options: {
                dataLabels:{
                  enabled: false
                }
              }
            }],
            dataLabels: {
              enabled: true,
              style: {
            },
              formatter: function (val: number) {
                return currencyFormatter(val);
              }
            },
            xaxis: {
              type: "string",
              categories: response.data.map(
                (item: Items) => monthNames[item?.mes - 1]
              ),
            },
            yaxis: {
              title: {
                text: '$ MXN'
              }
            },
            /* fill: {
              opacity: 1
            }, */
            legend: {
              position: 'top',
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (val: number) {
                  return currencyFormatter(val);
                }
              }
            }
          },
        });
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }, []);

  function currencyFormatter(number: number) {
    const formatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      minimumFractionDigits: 2,
      currency: "MXN",
    });
    return formatter.format(number);
  }

  return (
    <div>
      {
        chartData && chartData.series && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
            width={700}
          />
        )
      }
      
    </div>
  );
};

export default GraficaMxnTimb;

