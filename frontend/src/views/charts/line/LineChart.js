import { useEffect, useState } from "react"
import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CFormSelect } from '@coreui/react'
import { DateRangePicker } from 'rsuite';


import { useStore } from "src/store/useStore"
import apiService from "src/services/ApiService"
import { mount, update } from "./chart"
import './styles.css'

var mounted = false;
const LineChart = () => {
    const [cumulative, setCumulative] = useState('independent');
    const timePeriod = useStore(state => state.timePeriod)
    const data = useStore(state => state.data),
        location = useStore(state => state.location),
        supplier = useStore(state => state.supplier),
        tariff = useStore(state => state.tariff),
        currCategory = useStore(state => state.currCategory);

    const fetchData = (timePeriod) => {
        function convertDateToFormat(d) {
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }
        useStore.getState().setTimePeriod(timePeriod)
        const [start, end] = timePeriod;

        apiService.get_data(location, convertDateToFormat(start), convertDateToFormat(end), supplier, tariff)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.data && res.data.length === 0) return;
                useStore.getState().setData(res.data);
                useStore.getState().setTimePeriod(timePeriod);
            })
            .catch(console.error);
    }

    useEffect(() => {
        console.log(cumulative)
        update("line-chart", data, cumulative === 'cumulative');
    }, [data, cumulative])


    return (
        <CCard className="mb-4">
            <CCardHeader>Line Chart</CCardHeader>
            <CCardBody>
                <div className="d-flex flex-row justify-content-between">

                    <DateRangePicker
                        value={timePeriod}
                        onChange={(v) => fetchData(v)}
                    />
                    <CFormSelect
                        style={{ width: 250, margin: 5 }}
                        value={cumulative}
                        onChange={(e) => { setCumulative(e.target.value) }}
                        options={[
                            { label: 'Cumulative Data', value: 'cumulative' },
                            { label: 'Independent Data', value: 'independent' },
                        ]}
                    />
                    <CFormSelect
                        style={{ width: 250, margin: 5 }}
                        value={currCategory}
                        onChange={(e) => { useStore.getState().setCurrCategory(e.target.value) }}
                        options={[
                            { label: 'Confort Score', value: 'c_score' },
                            { label: 'Cost', value: 'cost' },
                            { label: 'Energy', value: 'kwh' }
                        ]}
                    />
                </div>


                <select id="selectButton"></select>
                <div id="line-chart" style={{ height: '400px' }}></div>
            </CCardBody>
        </CCard>
    )
}

export default LineChart
