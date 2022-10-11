from datetime import datetime
from time import strptime

from data import get_data, get_prices

# def best_ratio(data_path, prices, start, end):
#     """
#     Algorithm to calculate results with best score/price ratio.
#     Parameters
#     ----------
#         data_path : `str`
#             Path to the file with measurements.

#         prices : `list with float values`
#             List with all the prices.

#         start : `DateTime`
#             First day of the search interval.

#         end : `DateTime`
#             Last day of the search interval.

#     Returns
#     -------
#         response : `list with dictionaries`
#             List with dictionaries, where each dictionary is a group of statistics related to an hour.
#     """

#     temps = get_data(data_path, start, end)
  
#     c_score = 0
#     kw = 0
#     total_price = 0

#     data = []

#     for t, time in temps:
#         price = prices[datetime.fromisoformat(time[:-6]).hour]
#         if t<0:
#             c_score += 4
#             kw += 1.6
#             total_price += price * 1.6
#             data.append({'time':time, 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})
#         elif t<10:
#             c_score += 8
#             kw += 2.4
#             total_price += price * 2.4
#             data.append({'time':time, 'mode': 'COMFORT', 'c_score': 8, 'kwh': 2.4, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})
        
#         elif t<20:
#             c_score += 8
#             kw += 1.6
#             total_price += price * 1.6
#             data.append({'time':time, 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})
        
#         else:
#             c_score += 8
#             kw += 0.8
#             total_price += price * 0.8 
#             data.append({'time':time, 'mode': 'COMFORT', 'c_score': 8, 'kwh': 0.8, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})

#     #print(data)
#     return data


def min_cost(data_path, prices, start, end):
    """
    Algorithm to calculate results with the lowest cost.
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

    Returns
    -------
        response : `list with dictionaries`
            List with dictionaries, where each dictionary is a group of statistics related to an hour.
    """

    all_temps = get_data(data_path, start, end)

    data = []

    # iterate through day-by-day measurements
    for temps in all_temps:
    
        extra_cost = []
        for i, t in enumerate(temps):
            if t[0]<0:
                extra_cost.append((9.8*prices[i], i))

            elif t[0]<10:
                extra_cost.append((0.8*prices[i], i))
            
            elif t[0]<20:
                extra_cost.append((0.8*prices[i], i))
            
            else:
                extra_cost.append((0.4*prices[i], i))


        extra_cost = sorted(extra_cost, key = lambda x: x[0])

        indexes = [x[1] for x in extra_cost[0:7]]

        # iterate through measurements of a day
        for i, t in enumerate(temps):
            price = prices[i]

            if i in indexes:
                if t[0]<0:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 11.4*price, 'temperature': t})

                elif t[0]<10:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 2.4, 'cost': 2.4*price, 'temperature': t})
                
                elif t[0]<20:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t})
                
                else:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t})
            
            else:
                if t[0]<10:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t})
                
                elif t[0]<20:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t})
                
                else:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.4, 'cost': 0.4*price, 'temperature': t})

    return data
