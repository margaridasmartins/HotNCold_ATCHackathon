import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import apiservice from '../../services/ApiService.js';

const WidgetsDropdown = ({location}) => {   //TODO: provide supplier and tariff

  const TEMPERATURE = 0;
  const MODE = 1;
  const COST = 2;
  const KWH = 3;

  const [data, setData] = React.useState([
    { value: "Temperature", title: "Temperature", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "primary" },
    { value: "Lixo1", title: "Mode", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "danger" },
    { value: "Lixo2", title: "Cost", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "warning" },
    { value: "Lixo3", title: "Energy", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "success" },
  ]);
  
  React.useEffect(() => {
    apiservice.get_last_24h("1040200", "EDP", "S")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fill_charts(res.data);
      });
  }, [location]);


  const fill_charts = (d) => {
    // this function receives the data from the last 24 hours
    const chour = new Date().getHours();    // current hour
    const cvalues = d[chour]; 
    
    const temp = [...data];
    temp[TEMPERATURE]["chartData"] = d.map((obj) => obj["temperature"]);
    temp[TEMPERATURE]["value"] = cvalues["temperature"] + "ºC";

    temp[MODE]["value"] = cvalues["mode"];
    temp[MODE]["chartData"] = d.map((obj) => obj["c_score"]);
    
    temp[COST]["value"] = Math.round(cvalues["cost"]*100)/100+"€";
    temp[COST]["chartData"] = d.map((obj) => obj["cost"]);

    temp[KWH]["value"] = cvalues["kwh"] + "kwh";
    temp[KWH]["chartData"] = d.map((obj) => obj["kwh"]);

    for(let i = 0; i < 4; i++) {
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
              color={d["color"]}
              value={
                <>
                  {d["value"]}
                </>
              }
              title={d["title"]}
              chart={
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
                        pointBackgroundColor: getStyle(`--cui-${d["color"]}`),
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
