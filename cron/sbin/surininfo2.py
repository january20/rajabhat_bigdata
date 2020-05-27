#!/usr/local/bin/python3
import pymysql
import os
import requests
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import time
import numpy as np

#nohup python3 surininfo2.py > /dev/null 2>&1 &

conn = pymysql.connect(host='mysql-db', user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()

srru_mqtt = None

nodes = np.array([
    ['surininfo/node1/pm2.5',4,'/srru/ugm3/4',None],
    ['surininfo/node1/pm10',4,None,None],
    ['surininfo/node1/temperature',4,'/srru/temp/4',None],
    ['surininfo/node1/humidity',4,'/srru/humid/4',None],
    ['surininfo/node1/pressure', 4,None,None],

    ['surininfo/node2/pm2.5',8,'/srru/ugm3/8',None],
    ['surininfo/node2/pm10',8,None,None],
    ['surininfo/node2/temperature',8,'/srru/temp/8',None],
    ['surininfo/node2/humidity',8,'/srru/humid/8',None],
    ['surininfo/node2/pressure',8,None,None],

    ['surininfo/node3/pm2.5',5,'/srru/ugm3/5',None],
    ['surininfo/node3/pm10',5,None,None],
    ['surininfo/node3/temperature',5,'/srru/temp/5',None],
    ['surininfo/node3/humidity',5,'/srru/humid/5',None],
    ['surininfo/node3/pressure',5,None,None],

    ['surininfo/node4/pm2.5',6,'/srru/ugm3/6',None],
    ['surininfo/node4/pm10',6,None,None],
    ['surininfo/node4/temperature',6,'/srru/temp/6',None],
    ['surininfo/node4/humidity',6,'/srru/humid/6',None],
    ['surininfo/node4/pressure',6,None,None],

    ['surininfo/node5/pm2.5',7,'/srru/ugm3/7',None],
    ['surininfo/node5/pm10',7,None,None],
    ['surininfo/node5/temperature',7,'/srru/temp/7',None],
    ['surininfo/node5/humidity',7,'/srru/humid/7',None],
    ['surininfo/node5/pressure',7,None,None]

])

def on_connect(client, userdata, flags, rc):
    print("Connected => "+str(rc))
    for node in nodes:
        print("Subscribe->",node[0])
        client.subscribe(node[0])


def on_message(client, userdata, msg):
    #print(msg.topic+" "+str(msg.payload))
    topics = np.where( nodes[:,0] == msg.topic)[0]
    if len(topics) > 0:
        for t in topics:
            try:
                value = msg.payload.decode("utf-8")
                #print("[",t,"]=>",nodes[t][0], nodes[t][1],nodes[t][2],nodes[t][3],"=>",value)


                mas_iot_device_id = nodes[t][1]
                nodes[t][3] = value

                node = nodes[ (nodes[:,1] == mas_iot_device_id) ][:,3]
                if None not in node and float(node[0]) < 900:
                    nodes[ :,3 ][(nodes[:,1] == mas_iot_device_id)] = None
                    sql = "INSERT INTO `surin`.`trn_iot_data` (`mas_iot_device_id`, `dht_humidity`, `dht_temperature`, `pm25`, `pm10`, `pressure`) VALUES ('"+str(mas_iot_device_id)+"', '"+str(node[3])+"', '"+str(node[2])+"', '"+str(node[0])+"', '"+str(node[1])+"', '"+str(node[4])+"');"
                    print(mas_iot_device_id,"=>",node)
                    curr.execute(sql)
                    conn.commit()
                try:
                    if nodes[t][2] is not None:
                        publish.single(nodes[t][2], payload=value, qos=0, retain=False, hostname="mqtt.srru.ac.th",
                        port=1883, client_id="", keepalive=60, will=None, auth= {'username':"miot", 'password':"SrruMIoT@2019"}, tls=None,
                        protocol=mqtt.MQTTv311, transport="tcp")
                except:
                    pass

            except:
                pass


surin_info = mqtt.Client()
surin_info.on_connect = on_connect
surin_info.on_message = on_message
surin_info.connect("mqtt.surin.info", 1883, 60)
surin_info.loop_forever()
