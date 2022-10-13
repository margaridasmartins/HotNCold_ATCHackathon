from math import ceil
from data import get_data
import json

def best_ratio(prices, start, end, city= 1040200):
    """
    Algorithm to calculate results with best score/price ratio.
    Parameters
    ----------
        data_path : `str`
            Path to the file with measurements.
        prices : `list with float values`
            List with all the prices.
        start : `DateTime`
            First day of the search interval.
        end : `DateTime`
            Last day of the search interval.
        city :  int
            Temperature Location ID

    Returns
    -------
        response : `list with dictionaries`
            List with dictionaries, where each dictionary is a group of statistics related to an hour.
    """

    all_temps = get_data(start, end, city)

    data = []

    # iterate through day-by-day measurements
    for temps in all_temps:
        n_confort = 0

        for i, t in enumerate(temps):
            price = prices[i]
            if t[0]<0:
                if 24-i+n_confort>7:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t[0]})
                else:
                    n_confort+=1
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 11.4, 'cost': 11.4*price, 'temperature': t[0]})
            elif t[0]<10:
                n_confort+=1
                data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 2.4, 'cost': 2.4*price, 'temperature': t[0]})
            
            elif t[0]<20:
                n_confort+=1
                data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t[0]})
            
            else:
                n_confort+=1
                data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t[0]})

    return data


def min_cost(prices, start, end, city= 1040200, dead_hours=[]):
    """
    Algorithm to calculate results with the minimum cost considering min 124 confort score and deadhours.
    Parameters
    ----------
        data_path : `str`
            Path to the file with measurements.
        prices : `list[float]`
            List with all the prices.
        start : `DateTime`
            First day of the search interval.
        end : `DateTime`
            Last day of the search interval.
        city : `int`
            Temperature Location ID
        dead_hours: `list[int]`
            List with the hours where heating does not matter

    Returns
    -------
        response : `list[dict]`
            List with dictionaries, where each dictionary is a group of statistics related to an hour.
    """

    # load config file
    f = open("../config.json", "r")
    config = json.loads(f.read())
    f.close()

    all_temps = get_data(start, end, city)

    data = []

    # iterate through day-by-day measurements
    for temps in all_temps:
        extra_cost = []

        for i, t in enumerate(temps):
            if int(t[1][11:13]) not in dead_hours: # check if it is not a dead hour
                kw_eco = [temp["kw"] for temp in config["ECO"]["temp_intervals"] if temp["min_temp"] <= t[0] < temp["max_temp"]][0]

                kw_confort = [temp["kw"] for temp in config["CONFORT"]["temp_intervals"] if temp["min_temp"] <= t[0] < temp["max_temp"]][0]

                extra_cost.append((i, (kw_confort-kw_eco)*prices[i], t[0]))

            else: # dead hours are always ECO
                kw_eco = [temp["kw"] for temp in config["ECO"]["temp_intervals"] if temp["min_temp"] <= t[0] < temp["max_temp"]][0]

                data.append({'time':t[1], 'mode': 'ECO', 'c_score': config["ECO"]["confort_score"], 'kwh': kw_eco, 'cost': kw_eco*prices[i], 'temperature': t[0]})

        extra_cost = sorted(extra_cost, key = lambda x: (x[1], -x[2]))

        num_hours_confort = ceil((124 - 24*config["ECO"]["confort_score"])/(config["CONFORT"]["confort_score"]-config["ECO"]["confort_score"]))

        indexes = [x[0] for x in extra_cost[0:num_hours_confort]]

        # iterate through measurements of a day
        for i, t in enumerate(temps):
            if int(t[1][11:13])  not in dead_hours:
                if i in indexes:
                    kw_confort = [temp["kw"] for temp in config["CONFORT"]["temp_intervals"] if temp["min_temp"] <= t[0] < temp["max_temp"]][0]

                    data.append({'time':t[1], 'mode': 'CONFORT', 'c_score': config["CONFORT"]["confort_score"], 'kwh': kw_confort, 'cost': kw_confort*prices[i], 'temperature': t[0]})
                
                else:
                    kw_eco = [temp["kw"] for temp in config["ECO"]["temp_intervals"] if temp["min_temp"] <= t[0] < temp["max_temp"]][0]

                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': config["ECO"]["confort_score"], 'kwh': kw_eco, 'cost': kw_eco*prices[i], 'temperature': t[0]})

    return data
