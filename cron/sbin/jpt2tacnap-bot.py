#!/usr/local/bin/python3
import pymysql
import os
import requests
import aqi
import time

conn = pymysql.connect(host='mysql-db', user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()

def __init__():
    print("init....")
    rows = families()
    for row in rows:
        jpt2tacnap(row)

def jpt2tacnap(data):
    with conn.cursor() as cursor:
        tacnap = """SELECT surin.mas_tcnap_family_members.* FROM surin.mas_tcnap_family_members, surin.mas_families
WHERE surin.mas_tcnap_family_members.first_name=surin.mas_families.firstname
AND surin.mas_tcnap_family_members.first_name LIKE '%"""+str(data[9])+"""%'
AND surin.mas_tcnap_family_members.last_name LIKE '%"""+str(data[11])+"""%';"""
        cursor.execute(tacnap)
        if cursor.fetchone() is None:
            inser2tacnap(data)

def inser2tacnap(data):
    try:

        uri = "http://surin.srru.ac.th/api/jpt2tacnap?id="+str(data[0])
        print(uri)
        rs = requests.get(uri, verify=False)
        if rs.status_code == 200:
            print(rs.json())

    except:
       print(data[0], " => insert failed...")
       
def families():
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM surin.mas_families where id > 56733;")
        rows = cursor.fetchall()
        return rows 

if __name__ == '__main__':
    print("Robot A .. init..")
    __init__()
