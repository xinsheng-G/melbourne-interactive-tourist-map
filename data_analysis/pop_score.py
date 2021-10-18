import pandas as pd
import numpy as np
import math

cafe_2019 = pd.read_csv('../data/Cafe__restaurant__bistro_seats_2019.csv')
sensor_2019 = pd.read_csv('../data/Sensor_Pedes_loc_M_count.csv')
sensor_dict = {}


def calc_distance(long1, long2, lat1, lat2):
    R = 6371e3
    f1 = lat1 * math.pi / 180
    f2 = lat2 * math.pi / 180
    delta_f = (lat2 - lat1) * math.pi / 180
    delta_l = (long2 - long1) * math.pi / 180
    a = math.pow(math.sin(delta_f / 2), 2) + math.cos(f1) * math.cos(f2) * math.pow(math.sin(delta_l / 2), 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 3)


for i in range(len(sensor_2019)):
    coor = [sensor_2019.loc[i]['longitude'], sensor_2019.loc[i]['latitude']]
    sensor_dict.update({sensor_2019.loc[i]['Sensor_ID']: coor})

score_January = []
score_February = []
score_March = []
score_April = []
score_May = []
score_June = []
score_July = []
score_August = []
score_September = []
score_October = []
score_November = []
score_December = []

for i in range(len(cafe_2019)):
    distance_dict = dict.fromkeys(sensor_dict.keys(), [])
    long1 = cafe_2019.loc[i]['x']
    lat1 = cafe_2019.loc[i]['y']

    for j in distance_dict:
        long2 = sensor_dict[j][0]
        lat2 = sensor_dict[j][1]
        distance_dict[j] = calc_distance(long1, long2, lat1, lat2)

    distance_dict = {k: v for k, v in sorted(distance_dict.items(), key=lambda item: item[1])}
    best_four = list(distance_dict.items())[:4]

    score1 = 0
    score2 = 0
    score3 = 0
    score4 = 0
    score5 = 0
    score6 = 0
    score7 = 0
    score8 = 0
    score9 = 0
    score10 = 0
    score11 = 0
    score12 = 0
    for k in range(len(best_four)):
        temp = sensor_2019[sensor_2019['Sensor_ID'] == best_four[k][0]]
        try:
            score1 += (temp[temp['Month'] == 'January']['Hourly_Counts'].values[0]) / best_four[k][1]
            score1 = round(score1 / 4, 3)
        except:
            score1 = 0
        try:
            score2 += (temp[temp['Month'] == 'February']['Hourly_Counts'].values[0]) / best_four[k][1]
            score2 = round(score2 / 4, 3)
        except:
            score2 = 0
        try:
            score3 += (temp[temp['Month'] == 'March']['Hourly_Counts'].values[0]) / best_four[k][1]
            score3 = round(score3 / 4, 3)
        except:
            score3 = 0
        try:
            score4 += (temp[temp['Month'] == 'April']['Hourly_Counts'].values[0]) / best_four[k][1]
            score4 = round(score4 / 4, 3)
        except:
            score4 = 0
        try:
            score5 += (temp[temp['Month'] == 'May']['Hourly_Counts'].values[0]) / best_four[k][1]
            score5 = round(score5 / 4, 3)
        except:
            score5 = 0
        try:
            score6 += (temp[temp['Month'] == 'June']['Hourly_Counts'].values[0]) / best_four[k][1]
            score6 = round(score6 / 4, 3)
        except:
            score6 = 0
        try:
            score7 += (temp[temp['Month'] == 'July']['Hourly_Counts'].values[0]) / best_four[k][1]
            score7 = round(score7 / 4, 3)
        except:
            score7 = 0
        try:
            score8 += (temp[temp['Month'] == 'August']['Hourly_Counts'].values[0]) / best_four[k][1]
            score8 = round(score8 / 4, 3)
        except:
            score8 = 0
        try:
            score9 += (temp[temp['Month'] == 'September']['Hourly_Counts'].values[0]) / best_four[k][1]
            score9 = round(score9 / 4, 3)
        except:
            score9 = 0
        try:
            score10 += (temp[temp['Month'] == 'October']['Hourly_Counts'].values[0]) / best_four[k][1]
            score10 = round(score10 / 4, 3)
        except:
            score10 = 0
        try:
            score11 += (temp[temp['Month'] == 'November']['Hourly_Counts'].values[0]) / best_four[k][1]
            score11 = round(score11 / 4, 3)
        except:
            score11 = 0
        try:
            score12 += (temp[temp['Month'] == 'December']['Hourly_Counts'].values[0]) / best_four[k][1]
            score12 = round(score12 / 4, 3)
        except:
            score12 = 0

    score_January.append(score1)
    score_February.append(score2)
    score_March.append(score3)
    score_April.append(score4)
    score_May.append(score5)
    score_June.append(score6)
    score_July.append(score7)
    score_August.append(score8)
    score_September.append(score9)
    score_October.append(score10)
    score_November.append(score11)
    score_December.append(score12)

cafe_2019['January_Popular_Score'] = score_January
cafe_2019['February_Popular_Score'] = score_February
cafe_2019['March_Popular_Score'] = score_March
cafe_2019['April_Popular_Score'] = score_April
cafe_2019['May_Popular_Score'] = score_May
cafe_2019['June_Popular_Score'] = score_June
cafe_2019['July_Popular_Score'] = score_July
cafe_2019['August_Popular_Score'] = score_August
cafe_2019['September_Popular_Score'] = score_September
cafe_2019['October_Popular_Score'] = score_October
cafe_2019['November_Popular_Score'] = score_November
cafe_2019['December_Popular_Score'] = score_December

cafe_2019.to_csv('../data/cafe_pop_score.csv')
