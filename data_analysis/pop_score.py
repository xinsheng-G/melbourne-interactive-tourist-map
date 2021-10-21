import numpy as np
import pandas as pd
import math
import json
import re



cafe_2019c = pd.read_csv('../data/Cafe__restaurant__bistro_seats_2019_dropna.csv')
cafe_2019c = cafe_2019c.dropna()
with open('../data/Cafe__restaurant__bistro_seats_2019_dropna.json') as f1:
    cafe_2019j = json.load(f1)

bar_2019c = pd.read_csv('../data/Bar__tavern__pub_patron_capacity_2019_dropna.csv')
bar_2019c = bar_2019c.dropna()
with open('../data/Bar__tavern__pub_patron_capacity_2019_dropna.json') as f2:
    bar_2019j = json.load(f2)

building_2019 = pd.read_csv('../data/Building_information_2019_dropna.csv')
building_2019 = building_2019[building_2019['Predominant space use'] == 'Commercial Accommodation']
building_2019c = building_2019.reset_index(drop=True)
building_2019c = building_2019c.dropna()
with open('../data/Bar__tavern__pub_patron_capacity_2019_dropna.json') as f3:
    building_2019j = json.load(f3)

land_2019c = pd.read_csv('../data/Landmarks_New_dropna.csv')
land_2019c = land_2019c.dropna()
with open('../data/Landmarks_New_dropna.json') as f3:
    land_2019j = json.load(f3)

land_2019c['queryKey'] = land_2019c['Feature Name'].copy()
exploreL = []
for iteml in range(len(land_2019c)):
    exploreLi = land_2019c.loc[iteml]['Feature Name']
    exploreLi = exploreLi.strip()
    exploreLi = re.sub("'", '', exploreLi)  # remove ' for each feature name
    exploreLi = re.sub("\([^()]*\)", '', exploreLi)  # remove content in brackets
    exploreLi = re.sub(" ", '%20', exploreLi)
    exploreLi = re.sub("&", "%26", exploreLi)
    exploreL.append(exploreLi)
land_2019c['explore'] =exploreL

for i in range(len(land_2019j)):
    a = land_2019j[i]['Feature Name']
    l = land_2019j[i]['Feature Name']
    l = l.strip()
    l = re.sub("'", '', l)  # remove ' for each feature name
    l = re.sub("\([^()]*\)", '', l)  # remove content in brackets
    l = re.sub(" ", '%20', l)
    l = re.sub("&", "%26", l)
    land_2019j[i]['queryKey'] =  a
    land_2019j[i]['explore'] = l

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


def pop_score_csv(datac):
    jan = []
    feb = []
    mar = []
    apr = []
    may = []
    jun = []
    jul = []
    aug = []
    sept = []
    oct = []
    nov = []
    dec = []
    for k in range(len(datac)):
        distance_dict = dict.fromkeys(sensor_dict.keys(), [])
        long1 = datac.loc[k]['x']
        lat1 = datac.loc[k]['y']

        for l in distance_dict:
            long2 = sensor_dict[l][0]
            lat2 = sensor_dict[l][1]
            distance_dict[l] = calc_distance(long1, long2, lat1, lat2)

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
                if score1 == np.NaN:
                    score1 = 0
            except:
                score1 = 0
            try:
                score2 += (temp[temp['Month'] == 'February']['Hourly_Counts'].values[0]) / best_four[k][1]
                score2 = round(score2 / 4, 3)
                if score2 == np.NaN:
                    score2 = 0
            except:
                score2 = 0
            try:
                score3 += (temp[temp['Month'] == 'March']['Hourly_Counts'].values[0]) / best_four[k][1]
                score3 = round(score3 / 4, 3)
                if score3 == np.NaN:
                    score3 = 0
            except:
                score3 = 0
            try:
                score4 += (temp[temp['Month'] == 'April']['Hourly_Counts'].values[0]) / best_four[k][1]
                score4 = round(score4 / 4, 3)
                if score4 == np.NaN:
                    score4 = 0
            except:
                score4 = 0
            try:
                score5 += (temp[temp['Month'] == 'May']['Hourly_Counts'].values[0]) / best_four[k][1]
                score5 = round(score5 / 4, 3)
                if score5 == np.NaN:
                    score5 = 0
            except:
                score5 = 0
            try:
                score6 += (temp[temp['Month'] == 'June']['Hourly_Counts'].values[0]) / best_four[k][1]
                score6 = round(score6 / 4, 3)
                if score6 == np.NaN:
                    score6 = 0
            except:
                score6 = 0
            try:
                score7 += (temp[temp['Month'] == 'July']['Hourly_Counts'].values[0]) / best_four[k][1]
                score7 = round(score7 / 4, 3)
                if score7 == np.NaN:
                    score7 = 0
            except:
                score7 = 0
            try:
                score8 += (temp[temp['Month'] == 'August']['Hourly_Counts'].values[0]) / best_four[k][1]
                score8 = round(score8 / 4, 3)
                if score8 == np.NaN:
                    score8 = 0
            except:
                score8 = 0
            try:
                score9 += (temp[temp['Month'] == 'September']['Hourly_Counts'].values[0]) / best_four[k][1]
                score9 = round(score9 / 4, 3)
                if score9 == np.NaN:
                    score9 = 0
            except:
                score9 = 0
            try:
                score10 += (temp[temp['Month'] == 'October']['Hourly_Counts'].values[0]) / best_four[k][1]
                score10 = round(score10 / 4, 3)
                if score10 == np.NaN:
                    score2 = 10
            except:
                score10 = 0
            try:
                score11 += (temp[temp['Month'] == 'November']['Hourly_Counts'].values[0]) / best_four[k][1]
                score11 = round(score11 / 4, 3)
                if score11 == np.NaN:
                    score2 = 11
            except:
                score11 = 0
            try:
                score12 += (temp[temp['Month'] == 'December']['Hourly_Counts'].values[0]) / best_four[k][1]
                score12 = round(score12 / 4, 3)
                if score12 == np.NaN:
                    score12 = 0
            except:
                score12 = 0
        jan.append(score1)
        feb.append(score2)
        mar.append(score3)
        apr.append(score4)
        may.append(score5)
        jun.append(score6)
        jul.append(score7)
        aug.append(score8)
        sept.append(score9)
        oct.append(score10)
        nov.append(score11)
        dec.append(score12)

    datac['January_Popular_Score'] = jan
    datac['February_Popular_Score'] = feb
    datac['March_Popular_Score'] = mar
    datac['April_Popular_Score'] = apr
    datac['May_Popular_Score'] = may
    datac['June_Popular_Score'] = jun
    datac['July_Popular_Score'] = jul
    datac['August_Popular_Score'] = aug
    datac['September_Popular_Score'] = sept
    datac['October_Popular_Score'] = oct
    datac['November_Popular_Score'] = nov
    datac['December_Popular_Score'] = dec


    return datac






def pop_score_json(dataj, datac):
    newdata = {}
    for i in range(len(dataj)):
        for j in range(12):
            newdata[12 * i + j] = dataj[i].copy()
            newdata[12 * i + j]['month'] = j
    count = 0
    for k in range(len(datac)):
        distance_dict = dict.fromkeys(sensor_dict.keys(), [])
        long1 = datac.loc[k]['x']
        lat1 = datac.loc[k]['y']

        for l in distance_dict:
            long2 = sensor_dict[l][0]
            lat2 = sensor_dict[l][1]
            distance_dict[l] = calc_distance(long1, long2, lat1, lat2)

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
                if score1 == np.NaN:
                    score1 = 0
            except:
                score1 = 0
            try:
                score2 += (temp[temp['Month'] == 'February']['Hourly_Counts'].values[0]) / best_four[k][1]
                score2 = round(score2 / 4, 3)
                if score2 == np.NaN:
                    score2 = 0
            except:
                score2 = 0
            try:
                score3 += (temp[temp['Month'] == 'March']['Hourly_Counts'].values[0]) / best_four[k][1]
                score3 = round(score3 / 4, 3)
                if score3 == np.NaN:
                    score3 = 0
            except:
                score3 = 0
            try:
                score4 += (temp[temp['Month'] == 'April']['Hourly_Counts'].values[0]) / best_four[k][1]
                score4 = round(score4 / 4, 3)
                if score4 == np.NaN:
                    score4 = 0
            except:
                score4 = 0
            try:
                score5 += (temp[temp['Month'] == 'May']['Hourly_Counts'].values[0]) / best_four[k][1]
                score5 = round(score5 / 4, 3)
                if score5 == np.NaN:
                    score5 = 0
            except:
                score5 = 0
            try:
                score6 += (temp[temp['Month'] == 'June']['Hourly_Counts'].values[0]) / best_four[k][1]
                score6 = round(score6 / 4, 3)
                if score6 == np.NaN:
                    score6 = 0
            except:
                score6 = 0
            try:
                score7 += (temp[temp['Month'] == 'July']['Hourly_Counts'].values[0]) / best_four[k][1]
                score7 = round(score7 / 4, 3)
                if score7 == np.NaN:
                    score7 = 0
            except:
                score7 = 0
            try:
                score8 += (temp[temp['Month'] == 'August']['Hourly_Counts'].values[0]) / best_four[k][1]
                score8 = round(score8 / 4, 3)
                if score8 == np.NaN:
                    score8 = 0
            except:
                score8 = 0
            try:
                score9 += (temp[temp['Month'] == 'September']['Hourly_Counts'].values[0]) / best_four[k][1]
                score9 = round(score9 / 4, 3)
                if score9 == np.NaN:
                    score9 = 0
            except:
                score9 = 0
            try:
                score10 += (temp[temp['Month'] == 'October']['Hourly_Counts'].values[0]) / best_four[k][1]
                score10 = round(score10 / 4, 3)
                if score10 == np.NaN:
                    score2 = 10
            except:
                score10 = 0
            try:
                score11 += (temp[temp['Month'] == 'November']['Hourly_Counts'].values[0]) / best_four[k][1]
                score11 = round(score11 / 4, 3)
                if score11 == np.NaN:
                    score2 = 11
            except:
                score11 = 0
            try:
                score12 += (temp[temp['Month'] == 'December']['Hourly_Counts'].values[0]) / best_four[k][1]
                score12 = round(score12 / 4, 3)
                if score12 == np.NaN:
                    score12 = 0
            except:
                score12 = 0

        newdata[count]['score'] = score1
        count = count + 1
        newdata[count]['score'] = score2
        count = count + 1
        newdata[count]['score'] = score3
        count = count + 1
        newdata[count]['score'] = score4
        count = count + 1
        newdata[count]['score'] = score5
        count = count + 1
        newdata[count]['score'] = score6
        count = count + 1
        newdata[count]['score'] = score7
        count = count + 1
        newdata[count]['score'] = score8
        count = count + 1
        newdata[count]['score'] = score9
        count = count + 1
        newdata[count]['score'] = score10
        count = count + 1
        newdata[count]['score'] = score11
        count = count + 1
        newdata[count]['score'] = score12
        count = count + 1


def convert_geojson(items):
    return {"type": "Feature",
            "geometry": {"type": "Point",
                         "coordinates": [float(items['x']),
                                         float(items['y'])]},
            "properties": {key: value
                           for key, value in items.items()
                           if key not in ('y', 'x')}
            }

# with open('../data/cafe_pop.geojson', 'w') as fout1:
#     json.dump(pop_score(cafe_2019j, cafe_2019c), fout1)
# with open('../data/bar_pop.geojson', 'w') as fout2:
#     json.dump(pop_score(bar_2019j, bar_2019c), fout2)
# with open('../data/landmarks_pop.geojson', 'w') as fout3:
#     json.dump(pop_score(land_2019j, land_2019c), fout3)
# with open('../data/building_pop.geojson', 'w') as fout4:
#     json.dump(pop_score(building_2019j, building_2019c), fout4)
def pop_score_geojson(data):
    for item in data:
        data.append(convert_geojson(data[item]))

    geo = {"type": "FeatureCollection", "features": data}

    return geo


# pop_score_json(land_2019j, land_2019c)

pop_score_csv(land_2019c).to_csv('../data/land_pop_score_query.csv')