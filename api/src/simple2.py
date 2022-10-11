import json

f = open("../../data/temperatureData.json")
data = json.loads(f.read())
f.close()

temps = [x['airTemperature'] for x in data[48:72]]

extra_cost = []

for i, t in enumerate(temps):
    if t<0:
        extra_cost.append((9.8, i))

    elif t<10:
        extra_cost.append((0.8, i))
    
    elif t<20:
        extra_cost.append((0.8, i))
    
    else:
        extra_cost.append((0.4, i))


extra_cost = sorted(extra_cost, key = lambda x: x[0])

print([x[1] for x in extra_cost[0:7]])