import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CFormSelect,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CChartLine, CChartPie } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import DeadHourTable from '../widgets/DeadHourTable';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import billingservice from "../../services/BillingService.js";
import temperatureservice from "../../services/TemperatureService.js";
import ApiService from 'src/services/ApiService';
import { LineChart } from "src/views/charts"

import { useStore } from "src/store/useStore"


function convertDateToFormat(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const [locations, setLocations] = React.useState([]);

  const [suppliers, setSuppliers] = React.useState([]);

  const [tariffs, setTariffs] = React.useState([
    { label: "Simples", value: "S" },
    { label: "Bi-horária", value: "B" },
    { label: "Tri-horária", value: "T" },
  ]);

  const 
    location = useStore(state => state.location),
    supplier = useStore(state => state.supplier),
    tariff = useStore(state => state.tariff),
    timePeriod = useStore(state => state.timePeriod),
    hours = useStore(state => state.hours);

  // const [location, setLocation] = React.useState("0");
  // const [supplier, setSupplier] = React.useState("");
  // const [tariff, setTariff] = React.useState("");
  // const [deadHours, setDeadHours] = React.useState([]);
  const [piedata, setPiedata] = React.useState(null);
  
  React.useEffect(() => {
    temperatureservice.get_locations()
      .then((res) => res.json())
      .then((res) => setLocations(res.data))
  }, []);

  React.useEffect(() => {
    billingservice.get_suppliers()
      .then((res) => res.json())
      .then((res) => {
        let temp = res.data.map((s) => {
          return { label: s, value: s }
        })
        setSuppliers(temp);
      })
  }, [location]);

  React.useEffect(() => {
    if (supplier) {
      billingservice.get_tariffs(supplier)
        .then((res) => res.json())
        .then((res) => {
          setTariffs(res.data)
        })
    }
  }, [supplier]);

  // React.useEffect(() => {
  //   useStore.getState().setTariff(tariff);
  // }, [tariff]);

  // React.useEffect(() => {
  //   useStore.getState().setHours(deadHours);
  // }, [deadHours]);

  React.useEffect(() => {
    if (!(location && tariff && timePeriod && supplier)) return;
    const [start, end] = timePeriod;
    ApiService.deadhours(location, convertDateToFormat(start), convertDateToFormat(end), supplier, tariff, hours)
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.length === 0) {
          return;
        }
        console.log(res.data)
        return useStore.getState().setData(res.data)
      })
  }, [location, tariff, timePeriod, supplier, hours])

  const changePie = (data) => {
    // TODO: call this to match the request 
    let sumData = { "OFF": 0, "ECO": 0, "COMFORT": 0 };
    for (let i = 0; i < data.length; i++) {
      sumData[data['mode']] += 1;
    }

    setPiedata(
      {
        labels: ['OFF', 'ECO', 'COMFORT'],
        datasets: [
          {
            label: 'Mode',
            data: [sumData['OFF'], sumData['ECO'], sumData['COMFORT']],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    );
  }

  const updateDeadHours = (a) => {
    useStore.getState().setHours(a);
  }
  const getTotal = (piedata, value) => {
    let sum = piedata.datasets[0].data.reduce(
      (a, b) => a + b,
      0
    );
    if ((value / sum * 100).toFixed(0) !== '0')
      return (value / sum * 100).toFixed(0) + "%";
    return null
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: "#2327a",
        font: {
          weight: "bold",
          size: 16
        },
        padding: 6,
        formatter: (value) => {
          return getTotal(piedata, value);
        }
      }
    },
  }

  return (
    <>
      <div className='d-flex flex-row justify-content-around'>
        <div style={{ margin: 20 }} >
          <h3>Choose preferences</h3>
          <div className='d-flex flex-row'>
            <CFormSelect
              style={{ margin: "0px 10px" }}
              value={location}
              onChange={(e) => useStore.getState().setLocation(e.target.value)}
              options={
                [{ label: "Select location", value: 0 }, ...locations]
              }
            />
            <CFormSelect
              style={{ margin: "0px 10px" }}
              value={supplier}
              onChange={(e) => useStore.getState().setSupplier(e.target.value)}
              options={
                [{ label: "Select supplier", value: "" }, ...suppliers]
              }
            />
            <CFormSelect
              style={{ margin: "0px 10px" }}
              value={tariff}
              onChange={(e) => useStore.getState().setTariff(e.target.value)}
              options={
                [{ label: "Select tariff", value: "" }, ...tariffs]
              }
            />
          </div>

        </div>
        <div style={{ margin: 20 }}>
          <h3>Choose dead hours</h3>
          <DeadHourTable updateList={updateDeadHours} />
        </div>
      </div>
      {
        location && supplier && tariff &&
          <WidgetsDropdown location={location} supplier={supplier} tariff={tariff} />
      }

      <LineChart showTimePeriod />

      {piedata ?
        <Pie plugins={[ChartDataLabels]} options={pieChartOptions} data={piedata} style={{ maxHeight: 330, textAlign: "center", paddingTop: 15 }} />
        : <> </>
      }

      {/* <CCard className="mb-4">
        <CCardBody>
          <CChartPie
            data={{
              labels: ['Red', 'Green', 'Yellow'],
              datasets: [
                {
                  data: [300, 50, 100],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            }}
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
