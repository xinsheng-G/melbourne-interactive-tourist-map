# GEOM90007_assignment3
Author：Linjing Xuan, Jiacheng Yu, Yujia Zhu, Xinsheng Gao

Meeting 2:
- Layer: open space, road, POI, transport(bus(metro, regional), tram, train(rail line, station))
- tags: 
-   景点数据 (doen)
-   restaurant(羽佳，嘉诚提供数据)(done)+大众点评(rank?)，景点火车站tram人流量(done)（如果可以做时间段的话最好）
-   酒店+点评
-   厕所(done)
- legends

Meeting 3: 
- 实时更新人流量：https://data.melbourne.vic.gov.au/Transport/Pedestrian-Counting-System-Past-Hour-counts-per-mi/d6mv-s43h
- 地图类：layers：见meeting 2，tags：酒店餐厅厕所
- chart类：客流量+预测
- Yuuki新增数据:
-   Cafe__restaurant__bistro_seats_2019: 2019新版的餐厅数据 嘉诚那个是2017的 我们用最新的吧
-   Bar__tavern__pub_patron_capacity_2019：酒吧酒馆2019年的数据
-   Building_information_2019：各种建筑物的信息，Predominant space use的地方选Commercial Accommodation，就能拿到酒店的地点了
-   Live Music Venues：这个是我后来找到的，meeting的时候没有展示，游客也许会有兴趣
-   Pedestrian_Counting_System_-_Sensor_Locations：人流量监控器的地点
-   Pedestrian_Counting_System_-_Monthly__counts_per_hour_：过去十年的人流量数据，把监控器id匹配后可以得到某个地点的人流量
-   实时更新人流量https://data.melbourne.vic.gov.au/Transport/Pedestrian-Counting-System-Past-Hour-counts-per-mi/d6mv-s43h：可以用API随时调取最新人流量