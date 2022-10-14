import React from 'react'

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import sun from '../../assets/images/sol.jpg';
import clouds from '../../assets/images/nuvens.webp';
import snow from '../../assets/images/neve.webp';

export default function ForecastCard({ temperature, cost, kwh, date, selected }) {

    const getImage = () => {
        if (temperature > 20) {
            return sun;
        } else if (temperature > 10) {
            return clouds;
        } else {
            return snow;
        }
    }


    return (
        <div>
            <CCard className="mb-4"
                style={{ maxWidth: 250, minHeight: 100, color: "white", cursor: "pointer", ...(!selected ? {boxShadow: "2px 2px #00000066", opacity: "0.4"} : {}) }} >
                <CCardBody style={{ backgroundImage: `url(${getImage()})` }}>
                    <CRow >
                        <h2 style={{ textAlign: 'center', textShadow: "1px 1px #ffffff66" }}>{temperature}ºC</h2>
                    </CRow>
                    <CRow>
                        <span style={{ textAlign: 'center', textShadow: "1px 1px #ffffff66" }}>{date}</span>
                    </CRow>
                    <CRow>
                        <CCol sm={6} >
                            <h5 style={{ textAlign: 'left', textShadow: "1px 1px #ffffff66" }}>{cost}€</h5>
                        </CCol>

                        <CCol sm={6} >
                            <h5 style={{ textAlign: 'right', textShadow: "1px 1px #ffffff66" }}>{kwh}kwh</h5>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </div>
    )
}
