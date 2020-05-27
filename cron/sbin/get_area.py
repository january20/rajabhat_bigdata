import os
import xlrd 
import pymysql
import requests
import urllib.request, json

# db_name = 'surin'
db_name = 'mis-srru'

conn = pymysql.connect(host='www.srru.ac.th', port=3380, user='root', passwd='MySQL@2014', db=db_name)
curr = conn.cursor()

# Ref : http://stat.bora.dopa.go.th/dload/fccaa.htm
dls = "http://stat.bora.dopa.go.th/dload/ccaatt.xlsx"

resp = requests.get(dls)
with open('area.xlsx', 'wb') as output:
    output.write(resp.content)

wb = xlrd.open_workbook('area.xlsx') 
sheet = wb.sheet_by_index(0)

curr.execute("truncate aa_area")
conn.commit()

for i in range(sheet.nrows):
  code = str(sheet.cell_value(i, 0))
  name = str(sheet.cell_value(i, 1))

  status = "0" if name.endswith("*") else "1"
  full_id = code[:8]
  province_id = code[:2]
  district_id = code[:4]
  sub_district_id = code[:6]

  if full_id.endswith("00"):
    curr.execute("insert into aa_area (`code`, `name`, `status`) values ('" + full_id + "', '" + name.replace("*", "") + "', " + status + ");")
    conn.commit()

    # จังหวัด
    if full_id[2:] == "000000":
      # print(province_id + " => จังหวัด" + name)
      curr.execute("select id, full_id from ref_provinces where province_id = " + province_id + ";")
      data = curr.fetchone()
      if data == None:
        print("Insert Into Province " + province_id + " => " + name)
        curr.execute("insert into ref_provinces (`province_id`, `full_id`, `province_name_th`, `status`) values (" + province_id + ", " + full_id + ", '" + name.replace("*", "") + "', " + status + ")")
        conn.commit()
      else:
        print("Update Province      " + province_id + " => " + name)
        curr.execute("update ref_provinces set `full_id` = " + full_id + ", `province_name_th` = '" + name.replace("*", "") + "', `status` = " + status + " where province_id = " + province_id + ";")
        conn.commit()

    # อำเภอ
    elif full_id[4:] == "0000":
      # print(district_id + " => อำเภอ" + name)
      curr.execute("select id, full_id from ref_districts where district_id = " + district_id + ";")
      data = curr.fetchone()
      if data == None:
        print("Insert Into District " + district_id + " => " + name)
        curr.execute("insert into ref_districts (`district_id`, `full_id`, `province_id`, `district_name_th`, `district_name_en`, `status`) values (" + district_id + ", " + full_id + ", " + province_id + ", '" + name.replace("*", "") + "', '', " + status + ")")
        conn.commit()
      else:
        print("Update Province      " + district_id + " => " + name)
        curr.execute("update ref_districts set `full_id` = " + full_id + ", `province_id` = " + province_id + ", `district_name_th` = '" + name.replace("*", "") + "', `status` = " + status + " where district_id = " + district_id + ";")
        conn.commit()

    # ตำบล
    elif full_id[6:] == "00":
      # print(sub_district_id + " => ตำบล" + name)
      curr.execute("select id, full_id from ref_sub_districts where sub_district_id = " + sub_district_id + ";")
      data = curr.fetchone()
      if data == None:
        print("Insert Into Sub District " + sub_district_id + " => " + name)
        curr.execute("insert into ref_sub_districts (`sub_district_id`, `full_id`, `province_id`, `district_id`, `sub_district_name_th`, `sub_district_name_en`, `status`) values (" + sub_district_id + ", " + full_id + ", " + province_id + ", " + district_id + ", '" + name.replace("*", "") + "', '', " + status + ")")
        conn.commit()
      else:
        print("Update Sub District      " + sub_district_id + " => " + name)
        curr.execute("update ref_sub_districts set `full_id` = " + full_id + ", `province_id` = " + province_id + ", `district_id` = " + district_id + ", `sub_district_name_th` = '" + name.replace("*", "") + "', `status` = " + status + " where sub_district_id = " + sub_district_id + ";")
        conn.commit()

    else:
      print("Non.")
