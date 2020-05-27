#!/usr/local/bin/python3
import pymysql
import os
import requests
import aqi
import time
# import paho.mqtt.client as mqtt
# import paho.mqtt.publish as publish

conn = pymysql.connect(host='mysql-db', user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()

def __init__():
    print("init....")
    rs = curr.execute("SELECT * FROM surin.mas_families LIMIT 10;")
    #print(rs)
    if rs > 0:
        for row in curr:
            #print(row)
            tacnap = """SELECT surin.mas_tcnap_family_members.* FROM surin.mas_tcnap_family_members, surin.mas_families
WHERE surin.mas_tcnap_family_members.first_name=surin.mas_families.firstname
AND surin.mas_tcnap_family_members.first_name LIKE '%"""+str(row[9])+"""%'
AND surin.mas_tcnap_family_members.last_name LIKE '%"""+str(row[11])+"""%';"""
            #print(tacnap)
            chk=conn.cursor()
            chk_rs = chk.execute( tacnap )
            for row2 in chk:
                print(tacnap)
                print(row2)

if __name__ == '__main__':
    print("Robot A .. init..")
    __init__()