import pandas as pd

ped_2019 = pd.read_csv('../data/pedestrain_2019.csv')

ped_2019 = ped_2019[['Sensor_ID','Month','Hourly_Counts']]

print(ped_2019["Sensor_ID"])

ped_34 = ped_2019[(ped_2019["Sensor_ID"] == 34)]

ped_Month = ped_34[(ped_34['Month'] == 'November')]

print(ped_Month)