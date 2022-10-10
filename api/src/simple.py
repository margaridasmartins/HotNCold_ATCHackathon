import json

def simple(price, start=0, end=744):
    f = open("../../data/temperatureData.json")
    data = json.loads(f.read())
    f.close()
  
    temps = [(x['airTemperature'], x['time']) for x in data[start:end]]

    c_score = 0
    kw = 0
    total_price = 0

    data = []

    for t, time in temps:
        if t<0:
            c_score += 4
            kw += 1.6
            total_price += price * 1.6
            data.append({'time':time, 'mode': 'ECO', 'c_score': 4, 'kwh': 1.6, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})
            

        elif t<10:
            c_score += 8
            kw += 2.4
            total_price += price * 2.4
            data.append({'time':time, 'mode': 'COMFORT', 'c_score': 8, 'kwh': 2.4, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})
        
        elif t<20:
            c_score += 8
            kw += 1.6
            total_price += price * 1.6
            data.append({'time':time, 'mode': 'COMFORT', 'c_score': 8, 'kwh': 1.6, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})
        
        else:
            c_score += 8
            kw += 0.8
            total_price += price * 0.8 
            data.append({'time':time, 'mode': 'COMFORT', 'c_score': 8, 'kwh': 0.8, 'total_c_score': c_score, 'total_kwh': kw, 'temp': t, 'total_cost':total_price})

    return data

