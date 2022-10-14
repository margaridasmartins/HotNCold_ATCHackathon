import React from 'react'
import ForecastCard from '../widgets/ForecastCard'
import ApiService from 'src/services/ApiService';
import DeadHourTable from '../widgets/DeadHourTable';
import {
    CFormSelect,
} from '@coreui/react'

import temperatureservice from 'src/services/TemperatureService';
import billingservice from 'src/services/BillingService';
import { LineChart } from "src/views/charts"


export default function Forecast() {

    const [days, setDays] = React.useState([]);
    const [selected, setSelected] = React.useState(0);
    const [deadHours, setDeadHours] = React.useState(Array(24).fill(false));


    const [locations, setLocations] = React.useState([]);

    const [suppliers, setSuppliers] = React.useState([]);

    const [tariffs, setTariffs] = React.useState([
        { label: "Simples", value: "S" },
        { label: "Bi-horária", value: "B" },
        { label: "Tri-horária", value: "T" },
    ]);

    const [location, setLocation] = React.useState("0");
    const [supplier, setSupplier] = React.useState("");
    const [tariff, setTariff] = React.useState("");

    React.useEffect(() => {
        temperatureservice.get_locations()
            .then((res) => res.json())
            .then((res) => setLocations(res.data))

        const loc = localStorage.getItem("location");
        const sup = localStorage.getItem("supplier");
        const tar = localStorage.getItem("tariff");

        if (loc) setLocation(loc);

        if (sup) setSupplier(sup);

        if (tar) setTariff(tar);

    }, []);

    React.useEffect(() => {
        localStorage.setItem("location", location);
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
        localStorage.setItem("supplier", supplier);
        if (supplier) {
            billingservice.get_tariffs(supplier)
                .then((res) => res.json())
                .then((res) => {
                    setTariffs(res.data)
                })
        }
    }, [supplier]);

    React.useEffect(() => {
        localStorage.setItem("tariff", tariff);
    }, [tariff]);

    const updateDeadHours = (a) => {
        setDeadHours(a);
        ApiService.deadhours(1040200, "", "", "EDP", "S", a)
            .then((res) => res.json())
            .then((res) => console.log(res))
    }

    const changeDay = (i) => {
        setSelected(i);
    }

    function convertDateToFormat(d) {
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    }


    React.useEffect(() => {
        ApiService.forecast("1040200", "EDP", "S")      // FIXME: HARDCODED
            .then((res) => res.json())
            .then((res) => {

                let temp = {};
                let sums = {};
                let curr_date = new Date();
                for (let i = 0; i < 2; i++) {    // TODO: mudar para 3
                    curr_date.setDate(curr_date.getDate() + i)
                    let st = convertDateToFormat(curr_date);
                    temp[st] = [];
                    sums[st] = { date: st, cost: 0, kwh: 0, temperature: 0 };
                    for (let d = 0; d < 24; d++) {
                        temp[st].push(res.data[i * 24 + d])
                        sums[st]['cost'] += res.data[i * 24 + d]['cost'];
                        sums[st]['kwh'] += res.data[i * 24 + d]['kwh'];
                        sums[st]['temperature'] += res.data[i * 24 + d]['temperature'];
                    }
                    sums[st]['temperature'] /= 24;
                    sums[st]['cost'] = Math.round(sums[st]['cost'])
                    sums[st]['temperature'] = Math.round(sums[st]['temperature'])
                    sums[st]['kwh'] = Math.round(sums[st]['kwh'])

                }

                setDays(
                    Object.keys(sums).map((d) => {
                        return { data: temp[d], date: d, ...sums[d] }
                    })
                )
            })

    }, []);

    return (
        <div >
            <div className='d-flex flex-row justify-content-around'>
                <div style={{ margin: 20 }} >
                    <h3>Choose preferences</h3>
                    <div className='d-flex flex-row'>
                        <CFormSelect
                            style={{margin: "0px 10px"}}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            options={
                                [{ label: "Select location", value: 0 }, ...locations]
                            }
                        />
                        <CFormSelect
                            style={{margin:  "0px 10px"}}
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            options={
                                [{ label: "Select supplier", value: "" }, ...suppliers]
                            }
                        />
                        <CFormSelect
                            style={{margin: "0px 10px"}}
                            value={tariff}
                            onChange={(e) => setTariff(e.target.value)}
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

            <div className='d-flex flex-row w-100'>
                <div style={{ width: 300, marginRight: 20 }}>
                    {days.map((d, i) => {
                        return (<div onClick={() => { changeDay(i) }} key={d.date}>
                            <ForecastCard date={d.date} cost={d.cost} kwh={d.kwh} temperature={d.temperature} selected={selected == i} />
                        </div>)
                    })}

                </div>
                <LineChart />
            </div>

        </div>
    )
}
