import { API_URL } from "@/services/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const GraficaXml: React.FC = () => {
  type Items = {
    isr: number;
    xml: string | number;
    anio: string | number;
    origenRecurso: string | number;
  };

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "",
        data: [],
      },
    ],
    options: {},
  });

  useEffect(() => {
    axios
      .get(API_URL + "/XmlRecibido/cantXml")
      .then((response) => {
        setChartData({
          series: [
            {
              name: "IP",
              data: response.data.map((item: Items) =>
                item?.origenRecurso == "IP" ? item?.isr : null
              ),
            },
            {
              name: "IF",
              data: response.data.map((item: Items) =>
                item?.origenRecurso == "IF" ? item?.isr : null
              ),
            },
            {
              name: "IM",
              data: response.data.map((item: Items) =>
                item?.origenRecurso == "IM" ? item?.isr : null
              ),
            },
          ],
          options: {
            theme: {
              mode: "dark",
            },
            chart: {
              type: "bar",
              height: 350,
              // stacked: true,
            },
            responsive: [
              {
                breakpoint: 600,
                options: {
                  dataLabels: {
                    enabled: false,
                  },
                },
              },
            ],
            dataLabels: {
              enabled: true,
              formatter(val: number) {
                const format = currencyFormatter(val).split(".");
                if(format[0].replace("$", "") != "0"){
                  return "Xml Timbrados : " + format[0].replace("$", "");
                }
              },
            },
            xaxis: {
              type: "string",
              categories: response.data.map((item: Items) => item?.anio),
            },
            yaxis: {
              title: {
                text: "XML",
              },
            },
            /* fill: {
              opacity: 1
            }, */
            legend: {
              position: "top",
            },
            tooltip: {
              custom: function () {
                const currency =
                  "IP: " +
                  response.data.map((item: Items) =>
                    item?.origenRecurso == "IP"
                      ? currencyFormatter(item?.isr)
                      : null
                  ) +
                  "<br/>";
                const currency2 =
                  "IF : " +
                  response.data.map((item: Items) =>
                    item?.origenRecurso == "IF"
                      ? currencyFormatter(item?.isr)
                      : null
                  ) +
                  "<br/>";
                const currency3 =
                  "IM : " +
                  response.data.map((item: Items) =>
                    item?.origenRecurso == "IM"
                      ? currencyFormatter(item?.isr)
                      : null
                  ) +
                  "<br/>";
                return (
                  '<div style="margin: 15px">' +
                  currency +
                  currency2 +
                  currency3 +
                  "</div>"
                );
              },
              style: {
                fontSize: "12px",
                fontFamily: undefined,
              },
            },
          },
        });
      })
      .catch((e) => {
        console.log("Fatal" + e);
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
      {chartData && chartData.series && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
          width={700}
        />
      )}
    </div>
  );
};

export default GraficaXml;
