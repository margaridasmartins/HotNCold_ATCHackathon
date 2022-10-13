import { useEffect } from "react"
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

import { mount, update } from "./chart"
import data from "./data"
import './styles.css'


const LineChart = () => {

    useEffect(() => {
        const unmount = mount("line-chart", data);

        setTimeout(() => update(data), 5000)
        // FIXME: cannot remove listener on unmount
        // return(() => unmount());
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
