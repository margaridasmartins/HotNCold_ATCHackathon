import { useEffect } from "react"
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

import { mountChart } from "./chart"
import data from "./data"
import './styles.css'


const LineChart = () => {

    useEffect(() => {
        const unmountChart = mountChart("line-chart", data);
        // FIXME: cannot remove listener on unmount
        // return(() => unmountChart());
    }, [])

    return (
        <CCard className="mb-4">
            <CCardHeader>Line Chart</CCardHeader>
            <CCardBody  >
                <select id="selectButton"></select>
                <div id="line-chart" style={{ height: '400px' }}></div>
            </CCardBody>
        </CCard>
    )
}

export default LineChart
