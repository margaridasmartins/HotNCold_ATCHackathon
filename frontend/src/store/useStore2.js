import create from 'zustand';
import { combine } from "zustand/middleware";

export const useStore2 = create(combine(
    {
        data: [],
        timePeriod: [new Date("2021-12-31T00:00:00"), new Date("2021-12-31T00:00:00")],
        location: localStorage.getItem("location2"),
        supplier: localStorage.getItem("supplier2"),
        tariff: localStorage.getItem("tariff2"),
        hours: [],
    },
    (set) => ({
        setData: (data) => {
            return set(() => ({ data }))
        },
        setTimePeriod: (timePeriod) => {

            return set(() => ({ timePeriod }))
        },
        setLocation: (location) => {
            localStorage.setItem("location2", location)
            return set(() => ({ location }))
        },
        setSupplier: (supplier) => {
            localStorage.setItem("supplier2", supplier)
            return set(() => ({ supplier }))
        },
        setTariff: (tariff) => {
            localStorage.setItem("tariff2", tariff)
            return set(() => ({ tariff }))
        },
        setHours: (hours) => {
            return set(() => ({ hours: [...hours] }))
        }
    })
))
