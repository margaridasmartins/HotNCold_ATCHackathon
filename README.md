# Hot N Cold

Hot N Cold is our solution for the "Gestão de aquecimento residencial inteligente" challenge purposed by Bosch at the 1st edition of Aveiro Tech City Hackathon. It consists on a web application that allows its users to visualize and costumize the behaviour of an heat pump. The purpose is to allow for a more efficient use, keeping the costs low while mantaining a minimum of confort.

The application is available at: TBA

## Features
- Three different heat pump controll algorithms:
  - Base Algorithm: Best price for a minimum of confort score of 124
  - Max confort score / ratio
  - Dead Hours: The user can select hours were it does not matter the temperature of the house
- Heat pump past behaviour analysis (up to one month):
  - Hourly granularity with:
    - Energy usage 
    - Energy cost
    - Heat pump mode
    - External temperature
    - Confort Score
- Heat pump behaviour prediction for the next 72 hours based on external temperature forecast
- Easy costumization of energy suppliers and tariff types
- Multiple cities available


## Arquitecture
![Hot N Cold Arquitecture](https://github.com/margaridasmartins/HotNCold_ATCHackathon/blob/main/assets/arch_final.png)

## Instalation
### Requirements
- [docker](https://docs.docker.com/get-docker/)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (or download .zip)

### Deploying
```example
git clone git@github.com:margaridasmartins/HotNCold_ATCHackathon.git

cd HotNCold_ATCHackaton

docker-compose up
```
