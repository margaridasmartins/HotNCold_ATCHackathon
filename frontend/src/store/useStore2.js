import create from 'zustand';
import { combine } from "zustand/middleware";

export const useStore2 = create(combine(
    {
        data: [],
        currCategory: 'c_score',
        timePeriod: [new Date("2021-12-31T00:00:00"), new Date("2021-12-31T00:00:00")],
        location: localStorage.getItem("location"),
        supplier: localStorage.getItem("supplier"),
        tariff: localStorage.getItem("tariff"),
        hours: [],
    },
    (set) => ({
        setData: (data) => {
            return set(() => ({ data }))
        },
        setTimePeriod: (timePeriod) => {

            return set(() => ({ timePeriod }))
        },
        setCurrCategory: (currCategory) => {
            return set(() => ({ currCategory }))
        },
        setLocation: (location) => {
            localStorage.setItem("location", location)
            return set(() => ({ location }))
        },
        setSupplier: (supplier) => {
            localStorage.setItem("supplier", supplier)
            return set(() => ({ supplier }))
        },
        setTariff: (tariff) => {
            localStorage.setItem("tariff", tariff)
            return set(() => ({ tariff }))
        },
        setHours: (hours) => {
            console.log("ljkdsshjfds" , hours)
            return set(() => ({ hours: [...hours] }))
        }
    })
))
