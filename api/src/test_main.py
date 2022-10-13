import json
import os
from unittest import mock


from unittest.mock import Mock, patch
import datetime


mock_temp_data=[[[1.95,"2021-12-01T00:00:00+00:00"],[1.9,"2021-12-01T01:00:00+00:00"],[1.85,"2021-12-01T02:00:00+00:00"],[1.61,"2021-12-01T03:00:00+00:00"],[1.3,"2021-12-01T04:00:00+00:00"],[1.37,"2021-12-01T05:00:00+00:00"],[1.87,"2021-12-01T06:00:00+00:00"],[2.55,"2021-12-01T07:00:00+00:00"],[3.49,"2021-12-01T08:00:00+00:00"],[4.92,"2021-12-01T09:00:00+00:00"],[7.46,"2021-12-01T10:00:00+00:00"],[9.25,"2021-12-01T11:00:00+00:00"],[8.76,"2021-12-01T12:00:00+00:00"],[9.08,"2021-12-01T13:00:00+00:00"],[9.91,"2021-12-01T14:00:00+00:00"],[10.78,"2021-12-01T15:00:00+00:00"],[10.3,"2021-12-01T16:00:00+00:00"],[8.38,"2021-12-01T17:00:00+00:00"],[7.18,"2021-12-01T18:00:00+00:00"],[6.71,"2021-12-01T19:00:00+00:00"],[6.42,"2021-12-01T20:00:00+00:00"],[6.21,"2021-12-01T21:00:00+00:00"],[6.06,"2021-12-01T22:00:00+00:00"],[6.23,"2021-12-01T23:00:00+00:00"]]]
mock_bill_data=[0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.2,0.2]

@mock.patch("data.get_data")
def test_min_cost_algorithm_no_dead_hours(mock_get_data):
    from algorithms import min_cost
    """
    Given a user
    When he requests calculations using the min_cost algorithm  model
    The the API should return values so that the confort score 
    is a minimum of 124 and the price is as low as possible
    """
    city = '1010500'
    format = "%Y-%m-%dT%H:%M:%S"
    start = datetime.datetime.strptime('2021-12-01T00:00:00', format)
    end= datetime.datetime.strptime('2021-12-02T00:00:00', format)

    mock_get_data.return_value = mock_temp_data
    result = min_cost(mock_bill_data,start,end,city)

    assert mock_get_data.assert_called_once
    assert len(result) == 24

    total_confort_score = sum([r['c_score']for r in result])
    assert total_confort_score == 124

    total_price = sum([r['cost'] for r in result])
    assert round(total_price,1) == 11.6

