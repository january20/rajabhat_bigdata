#!/usr/local/bin/python3
import pymysql
import os
import requests
import aqi
import time
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

conn = pymysql.connect(host='mysql-db', user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()

def air_data(air_station_id,station_id):

    ugm3 = None
    aqid = None
    temp = None
    pressure = None
    humidity = None

    air_uri = "http://api.surin.info/getdata/pm_lastone/node="+str(station_id)
    rs = requests.get(air_uri)
    print(rs.status_code," => ",air_uri)

    if rs.status_code == 200:
        data = rs.json()
        if len(data) > 0:
            try:
                v = data[0]
                ugm3 = float(v['pm25_val'])
                aqid = aqi.to_iaqi(aqi.POLLUTANT_PM25, ugm3, algo=aqi.ALGO_EPA)
            except:
                print("AQI error occured!")
            #print(station_id, pm25,pm25_aqi)
            #sql = "INSERT INTO `surin`.`env_air_quality` (`env_air_station_id`, `ugm3`, `aqi`) VALUES ('"+str(air_station_id)+"', '"+str(pm25)+"', '"+str(pm25_aqi)+"');"
            #sql = "INSERT INTO `surin`.`trn_iot_data` (`mas_iot_device_id`, `ugm3`, `aqi`) VALUES ('"+str(air_station_id)+"', '"+str(pm25)+"', '"+str(pm25_aqi)+"');"
            #curr = conn.cursor()
            #curr.execute(sql)
            #conn.commit()

    temp_uri = "http://api.surin.info/getdata/temp_lastone/node="+str(station_id)
    trs = requests.get(temp_uri)
    print(trs.status_code,"=>", temp_uri)
    if trs.status_code == 200:
        data = trs.json()
        if len(data) > 0:
            try:
                #print(data)
                v = data[0]
                temp = float(v['temp_val'])
                pressure = float(v['pressure_val'])
                humidity = float(v['humidity_val'])
            except:
                print("Temp error occured!")

    print(ugm3, aqid, temp, pressure, humidity)

    if ugm3 is not None or aqid is not None or temp is not None or pressure is not None or humidity is not None:
        try:
            sql = "INSERT INTO `surin`.`trn_iot_data` (`mas_iot_device_id`, `dht_humidity`, `dht_temperature`, `ugm3`, `aqi`, `pressure`) VALUES ('"+str(air_station_id)+"', '"+str(humidity)+"', '"+str(temp)+"', '"+str(ugm3)+"', '"+str(aqid)+"','"+str(pressure)+"');"
            print(sql)
            curr = conn.cursor()
            curr.execute(sql)
            conn.commit()
            print('data inserted!')
            if temp is not None:
                topic = "/srru/temp/"+str(air_station_id)
                publish_data(topic,temp)
            if humidity is not None:
                topic = "/srru/humid/"+str(air_station_id)
                publish_data(topic,humidity)
            if ugm3 is not None:
                topic = "/srru/ugm3/"+str(air_station_id)
                publish_data(topic,ugm3)
            if aqid is not None:
                topic = "/srru/aqi/"+str(air_station_id)
                #publish_data(topic,aqid)

        except:
            print("insert error occured!!")

def publish_data(topic,value):
    print("publishing .. ",topic," : ",value)
    try:
        publish.single(topic, payload=value, qos=0, retain=False, hostname="mqtt.srru.ac.th",
        port=1883, client_id="", keepalive=60, will=None, auth= {'username':"miot", 'password':"SrruMIoT@2019"}, tls=None,
        protocol=mqtt.MQTTv311, transport="tcp")
    except:
        print("Failed to publish ", topic," : ",value)

    time.sleep(1)

def air_stations():
	rs = curr.execute("SELECT * FROM surin.env_air_stations;")
	print(rs)
	if rs > 0:
		for row in curr:
			print(row[0],row[5])
			air_data(row[0],row[5])
			time.sleep(1)

if __name__ == '__main__':
    #testMqtt()
    air_stations()
