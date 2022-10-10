import json

f = open("data/temperatureData.json")
data = json.loads(f.read())
f.close()

temps = [x['airTemperature'] for x in data[0:24]]

c_score = 0
kw = 0

for t in temps:
    if t<0:
        c_score += 4
        kw += 1.6

    elif t<10:
        c_score += 8
        kw += 2.4
    
    elif t<20:
        c_score += 8
        kw += 1.6
    
    else:
        c_score += 8
        kw += 0.8

print(c_score)
print(kw)