import pandas as pd
import re

land_2019 = pd.read_csv('../data/Landmarks.csv')
land_f_2019 = list(land_2019['Feature Name'])
land_f_2019_copy = land_f_2019.copy()
result = []

for l in land_f_2019:
    a = l
    l = l.strip()
    l = re.sub("'", '', l)  # remove ' for each feature name
    l = re.sub("\([^()]*\)", '', l)  # remove content in brackets
    l = re.sub(" ", '%20', l)
    l = re.sub("&", "%26", l)

    q1 = "<script type=\"text/javascript\" src=\"https://ssl.gstatic.com/trends_nrtr/2674_RC03/embed_loader.js\"></script>\n<script type=\"text/javascript\"> trends.embed.renderExploreWidget(\"TIMESERIES\", { \"comparisonItem\": [{ \"keyword\": \""
    q2 = ", \"geo\": \"AU\", \"time\": \"today 1-m\" }], \"category\": 0, \"property\": \"\" }, { \"exploreQuery\": \"date=today%201-m&geo=AU&q="
    q3 = "\", \"guestPath\": \"https://trends.google.com:443/trends/embed/\" }); </script>"
    result.append(q1+a+"\""+q2+l+q3)

land_2019['query'] = result

land_2019.to_csv('../data/Landmarks_query.csv')