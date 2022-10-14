import create from 'zustand';
import { combine } from "zustand/middleware";

export const useStore = create(combine(
    {
        data: [],
        timePeriod: [new Date("2021-12-31T00:00:00"), new Date("2021-12-31T00:00:00")],
        currCategory: 'c_score',
        location: localStorage.getItem("location"),
        supplier: localStorage.getItem("supplier"),
        tariff: localStorage.getItem("tariff"),
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
            return set(() => ({ location }))
        },
        setSupplier: (supplier) => {
            return set(() => ({ supplier }))
        },
        setTariff: (tariff) => {
            return set(() => ({ tariff }))
        }
    })
))
