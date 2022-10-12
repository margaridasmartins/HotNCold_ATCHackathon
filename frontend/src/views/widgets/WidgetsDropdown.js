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

const WidgetsDropdown = (props) => {

  const data = [
    { value: "Temperature", title: "30ºC", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "primary" },
    { value: "Lixo1", title: "31ºC", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "danger" },
    { value: "Lixo2", title: "32ºC", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "warning" },
    { value: "Lixo3", title: "33ºC", chartData: [1, 2, 3, 4, 5], chartLabels: [1, 2, 3, 4, 5], color: "success" },
  ]

  React.useEffect(() => {
    // TODO: request api
  }, [props.location]);

  return (
    <CRow>
      {data.map((d, i) => {
        return (
          <CCol sm={6} lg={3}>
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
                        radius: 4,
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
