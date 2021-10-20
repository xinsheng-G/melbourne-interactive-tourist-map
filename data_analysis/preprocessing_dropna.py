import pandas as pd
cafe_2019c = pd.read_csv('../data/Cafe__restaurant__bistro_seats_2019.csv')
cafe_2019c = cafe_2019c.dropna()
cafe_2019c.to_csv('../data/Cafe__restaurant__bistro_seats_2019_dropna.csv')

bar_2019c = pd.read_csv('../data/Bar__tavern__pub_patron_capacity_2019.csv')
bar_2019c = bar_2019c.dropna()
bar_2019c.to_csv('../data/Bar__tavern__pub_patron_capacity_2019_dropna.csv')

building_2019 = pd.read_csv('../data/Building_information_2019.csv')
building_2019 = building_2019[building_2019['Predominant space use'] == 'Commercial Accommodation']
building_2019c = building_2019.reset_index(drop=True)
building_2019c = building_2019c.dropna()
building_2019c.to_csv('../data/Building_information_2019_dropna.csv')

land_2019c = pd.read_csv('../data/Landmarks_New.csv')
land_2019c = land_2019c.dropna()
land_2019c.to_csv('../data/Landmarks_New_dropna.csv')