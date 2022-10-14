import React from 'react'
import ForecastCard from '../widgets/ForecastCard'
import ApiService from 'src/services/ApiService';

export default function Forecast() {
    
    const [days, setDays] = React.useState([]);
    const [selected, setSelected] = React.useState();

    const changeDay = (i) => {
        setSelected(i);
        console.log(selected)
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
            for(let i = 0; i < 2; i++) {    // TODO: mudar para 3
                curr_date.setDate(curr_date.getDate() + i)
                let st = convertDateToFormat(curr_date);
                temp[st] = [];
                sums[st] = {date: st, cost: 0, kwh: 0, temperature: 0};
                for(let d = 0; d < 24; d++) {
                    temp[st].push(res.data[i*24 + d])
                    sums[st]['cost'] += res.data[i*24 + d]['cost'];
                    sums[st]['kwh'] += res.data[i*24 + d]['kwh'];
                    sums[st]['temperature'] += res.data[i*24 + d]['temperature'];
                }
                sums[st]['temperature'] /= 24;
                sums[st]['cost'] = Math.round(sums[st]['cost'])
                sums[st]['temperature'] = Math.round(sums[st]['temperature'])
                sums[st]['kwh'] = Math.round(sums[st]['kwh'])

            } 

            setDays(
                Object.keys(sums).map((d) => {
                    return {data: temp[d], date: d, ...sums[d]}
                })  
            )
        })
    
    }, []);

    return (
        <div >
            {days.map((d,i) => {
                return (<div onClick={() => {changeDay(i)}} key={d.date}>
                    <ForecastCard  date={d.date} cost={d.cost} kwh={d.kwh} temperature={d.temperature} selected={selected == i}/>
                    </div>)
            })}
        </div>
    )
}
