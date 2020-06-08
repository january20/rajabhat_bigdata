#!/usr/local/bin/python3
import pymysql
import os
import requests
import time

conn = pymysql.connect(host='mysql-db', user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()

def __init__():

    sql = """SELECT surin.ref_sub_districts.sub_district_name_th, surin.ref_districts.district_name_th, surin.ref_villages.*
FROM surin.ref_villages, surin.ref_sub_districts, surin.ref_districts
WHERE surin.ref_villages.sub_district_id = surin.ref_sub_districts.id
AND surin.ref_sub_districts.district_id = surin.ref_districts.id
AND surin.ref_villages.latitude IS NULL
AND surin.ref_villages.longitude IS NULL
AND surin.ref_districts.province_id=32;"""
    print(sql)
    with conn.cursor() as cursor:
        cursor.execute(sql)
        for row in cursor.fetchall():
            print(row)
            address2loc(row[2],row[1], row[0], row[6])
            time.sleep(0.5)
        
def address2loc(i, district,subdistrict,village):
    try:
        print("-")
        uri = "https://maps.googleapis.com/maps/api/geocode/json?address=จังหวัดสุรินทร์+อำเภอ"+district+"+ตำบล"+subdistrict+"+"+village+"&key=AIzaSyAqXovEezhbGZJDB-fKok9QDax0iSr3iKQ"
        print(uri)
        rs = requests.get(uri, verify=False)
        if rs.status_code == 200:
            data = rs.json()['results'][0]
            #print(data['formatted_address'])
            sql = "UPDATE `surin`.`ref_villages` SET `latitude`='"+str(data['geometry']['location']['lat'])+"', `longitude`='"+str(data['geometry']['location']['lng'])+"', `formatted_address`='"+data['formatted_address']+"', `place_id`='"+data['place_id']+"', `status`=1 WHERE `id`="+str(i)+";"
            with conn.cursor() as cursor:
                print("executing => ", sql)
                cursor.execute(sql)
                conn.commit()
    except:
        print("err=>",i)

if __name__ == '__main__':
    print("Robot A .. init..")
    __init__()
