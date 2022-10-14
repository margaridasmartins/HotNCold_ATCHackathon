import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChartLine,
} from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import ApiService from '../../services/ApiService.js';

import { useStore } from "src/store/useStore"

const WidgetsDropdown = ({ location, supplier, tariff }) => {

  const TEMPERATURE = 0;
  const MODE = 1;
  const COST = 2;
  const KWH = 3;

  const [data, setData] = React.useState([
    { value: "", key: "temperature", title: "Temperature", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "var(--temperature-color)" },
    { value: "", key: "c_score", title: "Mode", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "var(--mode-color)" },
    { value: "", key: "cost", title: "Cost", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "var(--cost-color)" },
    { value: "", key: "kwh", title: "Energy", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "var(--kwh-color)" },
  ]);

  React.useEffect(() => {
    ApiService.get_last_24h(location, supplier, tariff)    // TODO: hardcoded city
      .then((res) => res.json())
      .then((res) => {
        fill_charts(res.data);
        useStore.getState().setData(res.data);
      });
  }, [location, supplier, tariff]);


  const fill_charts = (d) => {
    // this function receives the data from the last 24 hours
    const chour = new Date().getHours();    // current hour
    const cvalues = d[chour];

    const temp = [...data];
    temp[TEMPERATURE]["chartData"] = d.map((obj) => obj["temperature"]);
    temp[TEMPERATURE]["value"] = cvalues["temperature"] + "ºC";

    temp[MODE]["value"] = cvalues["mode"];
    temp[MODE]["chartData"] = d.map((obj) => obj["c_score"]);

    temp[COST]["value"] = Math.round(cvalues["cost"] * 100) / 100 + "€";
    temp[COST]["chartData"] = d.map((obj) => obj["cost"]);

    temp[KWH]["value"] = cvalues["kwh"] + "kwh";
    temp[KWH]["chartData"] = d.map((obj) => obj["kwh"]);

    for (let i = 0; i < 4; i++) {
      temp[i]["chartLabels"] = Array.from(Array(d.length).keys());
    }

    setData(temp);
  }

  return (
    <CRow>
      {data.map((d, i) => {
        return (
          <CCol sm={6} lg={3} key={i}>
            <CWidgetStatsA
              className="mb-4"
              style={{ background: d["color"], color: "rgba(255,255,255,.87)" }}
              value={
                <>
                  {d["value"]}
                </>
              }
              title={d["title"]}
              chart={
                <>
                  {
                    d["title"] !== "Temperature" &&
                    <CButton color="light"
                      onClick={() => useStore.getState().setCurrCategory(d.key)}
                      style={{
                        position: 'absolute', right: 10, top: 10,
                        backgroundColor: "rgba(255,255,255,.37)", padding: "4px 8px"
                      }}
                    >
                      <CIcon
                        icon={cilChartLine}
                        style={{
                          width: 20, height: 20,
                          cursor: "pointer",
                        }}
                      />
                    </CButton>
                  }
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '70px' }}
                    data={{
                      labels: d["chartLabels"],
                      datasets: [
                        {
                          label: d["value"],
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          data: d["chartData"],
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: Math.min(...d["chartData"]) - 1,
                          max: Math.max(...d["chartData"]) + 1,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                          tension: 0.4,
                        },
                        point: {
                          radius: 0,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                </>

              }
            />
          </CCol>
        );
      })
      }
    </CRow>
  )
}

export default WidgetsDropdown
