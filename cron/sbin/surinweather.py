#!/usr/local/bin/python3
import pymysql
import os
import requests 

conn = pymysql.connect(host='mysql-db', user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()

def getweather(sid,station_id):
    api_url = "https://api.openweathermap.org/data/2.5/weather?id="+str(station_id)+"&appid=6b2eeeccca5817001e7fc2431189602c&units=metric"
    print(api_url)
    rs = requests.get(api_url)
    #print(rs.status_code)
    if rs.status_code == 200:
        data = rs.json()
        print(rs.json())

        weather = data['weather'][0]['main']
        description = data['weather'][0]['description']
        temp = data['main']['temp']
        pressure = data['main']['pressure']
        humidity = data['main']['humidity']
        temp_min = data['main']['temp_min']
        temp_max = data['main']['temp_max']
        
        sea_level = '0'
        grnd_level = '0'

        try:
            sea_level = data['main']['sea_level']
            grnd_level = data['main']['grnd_level']
        except:
            sea_level = '0'
            grnd_level = '0'
        
        wind_speed = data['wind']['speed']
        wind_deg = 0#data['wind']['deg']

        clouds =  data['clouds']['all']
        sunrise = data['sys']['sunrise']
        sunset = data['sys']['sunset']

        sql = "INSERT INTO `surin`.`weathers` (`weather_station_id`,`weather`, `description`, `temp`, `temp_min`, `temp_max`, `pressure`, `humidity`, `sea_level`, `grnd_level`, `wind_speed`, `wind_deg`, `clouds`, `sunrise`, `sunset`) VALUES (\'"+str(sid)+"\',\'"+str(weather)+"\',\'"+str(description)+"\', \'"+str(temp)+"\', \'"+str(temp_min)+"\', \'"+str(temp_max)+"\', \'"+str(pressure)+"\', \'"+str(humidity)+"\', \'"+str(sea_level)+"\', \'"+str(grnd_level)+"\', \'"+str(wind_speed)+"\', \'"+str(wind_deg)+"\', \'"+str(clouds)+"\', \'"+str(sunrise)+"\', \'"+str(sunset)+"\');"
        #print(sql)
        curr2 = conn.cursor()
        curr2.execute(sql)
        conn.commit()

        #print(data['weather'][0]['id'])

def weather_stations():
    rs = curr.execute("SELECT * FROM surin.weather_stations;")
    #print(rs)
    if rs > 0:
        for row in curr:
            #print(row)
            getweather(row[0],row[3])

if __name__ == '__main__':
    weather_stations()
