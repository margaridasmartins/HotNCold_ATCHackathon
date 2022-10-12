from data import get_data

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


def min_cost(prices, start, end,  city= 1040200):
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
        city :  int
            Temperature Location ID

    Returns
    -------
        response : `list with dictionaries`
            List with dictionaries, where each dictionary is a group of statistics related to an hour.
    """

    all_temps = get_data( start, end,  city)

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
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 11.4*price, 'temperature': t[0]})

                elif t[0]<10:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 2.4, 'cost': 2.4*price, 'temperature': t[0]})
                
                elif t[0]<20:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t[0]})
                
                else:
                    data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t[0]})
            
            else:
                if t[0]<10:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t[0]})
                
                elif t[0]<20:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t[0]})
                
                else:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.4, 'cost': 0.4*price, 'temperature': t[0]})

    return data

def dead_hours(prices, start, end, dead_hours, city= 1040200):
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

        dead_hours: `List[int]`
            List with the hours where heating does not matter
        city :  int
            Temperature Location ID

    Returns
    -------
        response : `list with dictionaries`
            List with dictionaries, where each dictionary is a group of statistics related to an hour.
    """
    all_temps = get_data( start, end,  city)

    data = []


    # iterate through day-by-day measurements
    for temps in all_temps:
        
        extra_cost = []
        for i, t in enumerate(temps):
            if int(t[1][11:13]) not in dead_hours: # check if it is not a dead hour
                if t[0]<0:
                    extra_cost.append((9.8*prices[i], i))

                elif t[0]<10:
                    extra_cost.append((0.8*prices[i], i))
                
                elif t[0]<20:
                    extra_cost.append((0.8*prices[i], i))
                
                else:
                    extra_cost.append((0.4*prices[i], i))
            else: # dead hours are always ECO
                if t[0] < 0:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'cost': 1.6*prices[i], 'temperature': t[0]})
                
                elif t[0]<20:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.8, 'cost': 0.8*prices[i], 'temperature': t[0]})
                    
                else:
                    data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.4, 'cost': 0.4*prices[i], 'temperature': t[0]})



        extra_cost = sorted(extra_cost, key = lambda x: x[0])

        indexes = [x[1] for x in extra_cost[0:7]]

        # iterate through measurements of a day
        for i, t in enumerate(temps):
            price = prices[i]

            if int(t[1][11:13])  not in dead_hours:
                if i in indexes:
                    if t[0]<0:
                        data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 11.4*price, 'temperature': t[0]})

                    elif t[0]<10:
                        data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 2.4, 'cost': 2.4*price, 'temperature': t[0]})
                    
                    elif t[0]<20:
                        data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t[0]})
                    
                    else:
                        data.append({'time':t[1], 'mode': 'COMFORT', 'c_score': 8, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t[0]})
                
                else:
                    if t[0]<10:
                        data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'cost': 1.6*price, 'temperature': t[0]})
                    
                    elif t[0]<20:
                        data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.8, 'cost': 0.8*price, 'temperature': t[0]})
                    
                    else:
                        data.append({'time':t[1], 'mode': 'ECO', 'c_score': 4, 'kwh': 0.4, 'cost': 0.4*price, 'temperature': t[0]})

    return data