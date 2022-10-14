import React, { useState, useEffect } from 'react'

import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CFormSelect } from '@coreui/react'
import { DateRangePicker } from 'rsuite';

import { useStore } from "src/store/useStore"
import { useStore2 } from "src/store/useStore2"

import { LineChart } from '../charts';


import billingservice from "../../services/BillingService.js";
import temperatureservice from "../../services/TemperatureService.js";
import ApiService from 'src/services/ApiService';


// import { update } from "src/views/charts/line/chart"

function convertDateToFormat(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}



export default function Analyzer() {
  const [cumulative, setCumulative] = useState('independent');

  const [locations, setLocations] = React.useState([]);

  const [suppliers, setSuppliers] = React.useState([]);

  const [tariffs, setTariffs] = React.useState([
    { label: "Simples", value: "S" },
    { label: "Bi-horária", value: "B" },
    { label: "Tri-horária", value: "T" },
  ]);


  const
    currCategory = useStore(state => state.currCategory),
    data = useStore(state => state.data),
    location = useStore(state => state.location),
    supplier = useStore(state => state.supplier),
    tariff = useStore(state => state.tariff),
    timePeriod = useStore(state => state.timePeriod),
    hours = useStore(state => state.hours);

  const
    data2 = useStore2(state => state.data),
    location2 = useStore2(state => state.location),
    supplier2 = useStore2(state => state.supplier),
    tariff2 = useStore2(state => state.tariff),
    hours2 = useStore2(state => state.hours);

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


  const fetchData = (timePeriod) => {
    useStore.getState().setTimePeriod(timePeriod)
  }


  useEffect(() => {
    if (!(location && tariff && timePeriod && supplier)) return;
    const [start, end] = timePeriod;
    ApiService.deadhours(location, convertDateToFormat(start), convertDateToFormat(end), supplier, tariff, hours)
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.length === 0) {
          return;
        }
        return useStore.getState().setData(res.data)
      })
  }, [location, tariff, timePeriod, supplier, hours])


  useEffect(() => {
    console.log("DATA2?")
    if (!(location2 && tariff2 && timePeriod && supplier2)) return;
    const [start, end] = timePeriod;
    ApiService.deadhours(location2, convertDateToFormat(start), convertDateToFormat(end), supplier2, tariff2, hours)
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.length === 0) {
          return;
        }
        console.log("DATA2", data2)
        return useStore2.getState().setData(res.data)
      })
  }, [location2, tariff2, timePeriod, supplier2, hours2])

  return (
    <>
      <div className='d-flex flex-row'>
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


        <div style={{ margin: 20 }} >
          <h3>Choose preferences</h3>
          <div className='d-flex flex-row'>
            <CFormSelect
              style={{ margin: "0px 10px" }}
              value={location2}
              onChange={(e) => useStore2.getState().setLocation(e.target.value)}
              options={
                [{ label: "Select location", value: 0 }, ...locations]
              }
            />
            <CFormSelect
              style={{ margin: "0px 10px" }}
              value={supplier2}
              onChange={(e) => useStore2.getState().setSupplier(e.target.value)}
              options={
                [{ label: "Select supplier", value: "" }, ...suppliers]
              }
            />
            <CFormSelect
              style={{ margin: "0px 10px" }}
              value={tariff2}
              onChange={(e) => useStore2.getState().setTariff(e.target.value)}
              options={
                [{ label: "Select tariff", value: "" }, ...tariffs]
              }
            />
          </div>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between">

        <DateRangePicker
          value={timePeriod}
          onChange={(v) => fetchData(v)}
        />
        <CFormSelect
          style={{ width: 250 }}
          value={cumulative}
          onChange={(e) => { setCumulative(e.target.value) }}
          options={[
            { label: 'Cumulative Data', value: 'cumulative' },
            { label: 'Independent Data', value: 'independent' },
          ]}
        />
        <CFormSelect
          style={{ width: 250 }}
          value={currCategory}
          onChange={(e) => { useStore.getState().setCurrCategory(e.target.value) }}
          options={[
            { label: 'Confort Score', value: 'c_score' },
            { label: 'Cost', value: 'cost' },
            { label: 'Energy', value: 'kwh' }
          ]}
        />
      </div>

      <div className='d-flex flex-row'>
        <LineChart showNothing cumulativeOut={cumulative} />
        <LineChart showNothing showData2 cumulativeOut={cumulative} />

      </div>
    </>
  )
}
