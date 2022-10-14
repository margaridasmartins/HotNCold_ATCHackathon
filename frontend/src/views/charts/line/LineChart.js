import { useEffect, useState } from "react"
import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CFormSelect } from '@coreui/react'
import { DateRangePicker } from 'rsuite';


import { useStore } from "src/store/useStore"
import { useStore2 } from "src/store/useStore2"

import apiService from "src/services/ApiService"
import { update } from "./chart"
import { update as update2 } from "./chart2"

import './styles.css'

const LineChart = ({ showTimePeriod, showNothing, showData2, cumulativeOut = null }) => {
    const [cumulative, setCumulative] = useState('independent');
    const timePeriod = useStore(state => state.timePeriod)
    const data = useStore(state => state.data),
        data2 = useStore2(state => state.data),
        currCategory = useStore(state => state.currCategory);

    const fetchData = (timePeriod) => {
        useStore.getState().setTimePeriod(timePeriod)
    }

    useEffect(() => {
        console.log(showData2, cumulativeOut, (cumulativeOut ? cumulativeOut : cumulative))

        const up = showData2 ? update2 : update;

        up(showData2 ? "line-chart2" : "line-chart", showData2 ? data2 : data,
            (cumulativeOut ? cumulativeOut : cumulative) === 'cumulative');
    }, [data, data2, cumulative, cumulativeOut])

    return (
        <CCard className="mb-4 w-100">
            <CCardHeader>Heat Pump Summary</CCardHeader>
            <CCardBody>
                {!showNothing &&
                    <div className="d-flex flex-row justify-content-between">

                        {showTimePeriod && <DateRangePicker
                            value={timePeriod}
                            onChange={(v) => fetchData(v)}
                        />}
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
                }
                <div id={showData2 ? "line-chart2" : "line-chart"} style={{ height: '500px' }}></div>
            </CCardBody>
        </CCard>
    )
}

export default LineChart
