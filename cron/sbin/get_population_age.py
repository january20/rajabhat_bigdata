import pymysql
import urllib3
import codecs

conn = pymysql.connect(host='www.srru.ac.th', port=3380, user='root', passwd='MySQL@2014', db='surin')
curr = conn.cursor()
prov = conn.cursor()

pop_txt = 'population_age.txt'
http = urllib3.PoolManager()

sql = "TRUNCATE `surin`.`trn_populations_age`"
curr.execute(sql)
conn.commit()

place_type_id = ""
place_id = ""
place_full_id = ""
province_id = ""
district_id = ""
sub_district_id = ""
province_name = ""

for year in range(37, 62):
    rs = prov.execute("SELECT id, province_name_th FROM surin.ref_provinces where id > 9;")

    if rs > 0:
        for row in prov:
            r = http.request('GET', 'http://stat.bora.dopa.go.th/stat/xstat/new/' + str(year) + '12/' + str(year) + '12cc' + str(row[0]) + '.txt')

            with open(pop_txt, 'wb') as output:
                output.write(r.data.decode('cp874').encode('utf-8'))

                pop_f = open(pop_txt, 'r')

                for line in pop_f:
                    words = line.split("|")
                    place = words[0].strip()
                    # ประเทศ
                    if place.startswith("ทั่ว"):
                        place_type_id = "1"
                        place_id = "null"
                        place_full_id = "null"
                        province_id = "null"
                        district_id = "null"
                        sub_district_id = "null"
                    # จังหวัด
                    elif place.startswith("จังหวัด") or place.startswith("กรุงเทพ"):
                        curr.execute("select id, full_id, province_name_th from surin.ref_provinces where concat('จังหวัด', province_name_th) = '" + place + "' or province_name_th = '" + place + "'")
                        data = curr.fetchone()
                        place_type_id = "2"
                        place_id = "'" + str(data[0]) + "'"
                        place_full_id = "'" + str(data[1]) + "'"
                        province_id = "'" + str(data[0]) + "'"
                        district_id = "null"
                        sub_district_id = "null"
                        province_name = data[2]
                    # อำเภอ
                    elif place.startswith("เขต") or place.startswith("ท้องถิ่นเขต") or place.startswith("อำเภอ") or place.startswith("กิ่งอำเภอ"):
                        curr.execute("select id, full_id from surin.ref_districts where province_id = " + province_id + " and (district_name_th = '" + place + "' or concat('ท้องถิ่น', district_name_th) = '" + place + "' or concat('อำเภอ', district_name_th) = '" + place + "' or concat('กิ่งอำเภอ', district_name_th) = '" + place + "')")
                        data = curr.fetchone()
                        place_type_id = "3"
                        place_id = "'" + str(data[0]) + "'" if data else "null"
                        place_full_id = "'" + str(data[1]) + "'" if data else "null"
                        district_id = "'" + str(data[0]) + "'" if data else "null"
                        sub_district_id = "null"
                    # ตำบล
                    elif place.startswith("แขวง") or place.startswith("ตำบล"):
                        curr.execute("select id, full_id from surin.ref_sub_districts where province_id = " + province_id + " and district_id = " + district_id + " and (concat('แขวง', sub_district_name_th) = '" + place + "' or concat('ตำบล', sub_district_name_th) = '" + place + "')")
                        data = curr.fetchone()
                        if data == None:
                            curr.execute("select id, full_id from surin.ref_sub_districts where province_id = " + province_id + " and (concat('แขวง', sub_district_name_th) = '" + place + "' or concat('ตำบล', sub_district_name_th) = '" + place + "')")
                            data = curr.fetchone()
                        place_type_id = "4"
                        place_id = "'" + str(data[0]) + "'" if data else "null"
                        place_full_id = "'" + str(data[1]) + "'" if data else "null"
                        sub_district_id = "'" + str(data[0]) + "'" if data else "null"

                    elif place.startswith("องค์การบริหารส่วนจังหวัด"):
                        place_type_id = "6"
                        place_id = "null"
                        place_full_id = "null"

                    elif place.startswith("เทศบาลนคร") or place.startswith("ท้องถิ่นเทศบาลนคร"):
                        place_type_id = "7"
                        place_id = "null"
                        place_full_id = "null"

                    elif place.startswith("เทศบาลเมือง") or place.startswith("ท้องถิ่นเทศบาลเมือง"):
                        place_type_id = "8"
                        place_id = "null"
                        place_full_id = "null"

                    elif place.startswith("เทศบาลตำบล") or place.startswith("ท้องถิ่นเทศบาลตำบล"):
                        place_type_id = "9"
                        place_id = "null"
                        place_full_id = "null"

                    elif place.startswith("องค์การบริหารส่วนตำบล"):
                        place_type_id = "10"
                        place_id = "null"
                        place_full_id = "null"

                    elif place.startswith("เมืองพัทยา"):
                        place_type_id = "11"
                        place_id = "null"
                        place_full_id = "null"

                    else:
                        place_type_id = "null"
                        place_id = "null"
                        place_full_id = "null"

                    sql_fields_tmp = "`male_age_000`,`female_age_000`,"
                    sql_vlaues_tmp = words[1].strip().replace(',', '') + "," + words[2].strip().replace(',', '') + ","

                    for x in range(1, 101):
                        sql_fields_tmp += "`male_age_" + str(x).rjust(3, '0') + "`,`female_age_" + str(x).rjust(3, '0') + "`,"
                        sql_vlaues_tmp += words[(x * 2) + 1].strip().replace(',', '') + "," + words[(x * 2) + 2].strip().replace(',', '') + ","

                    sql_fields_tmp += "`male_age_999`,`female_age_999`"
                    sql_vlaues_tmp += words[203].strip().replace(',', '') + "," + words[204].strip().replace(',', '')

                    sql_fields = "`year`,`place`,`place_type_id`,`place_id`,`place_full_id`,`male_tdob`,`female_tdob`,`total_tdob`,`male_xhouse`,`female_xhouse`,`total_xhouse`,`male_other_nat`,`female_other_nat`,`total_other_nat`,`male_move`,`female_move`,`total_move`,`male_tot`,`female_tot`,`total_to`," + sql_fields_tmp

                    try:
                        sql_values = "25" + str(year) + ","
                        sql_values += "'" + place + "',"
                        sql_values += place_type_id + ","
                        sql_values += place_id + ","
                        sql_values += place_full_id + ","
                        sql_values += words[205].strip().replace(',', '') + ","
                        sql_values += words[206].strip().replace(',', '') + ","
                        sql_values += words[207].strip().replace(',', '') + ","
                        sql_values += words[208].strip().replace(',', '') + ","
                        sql_values += words[209].strip().replace(',', '') + ","
                        sql_values += words[210].strip().replace(',', '') + ","
                        sql_values += words[211].strip().replace(',', '') + ","
                        sql_values += words[212].strip().replace(',', '') + ","
                        sql_values += words[213].strip().replace(',', '') + ","
                        sql_values += words[214].strip().replace(',', '') + ","
                        sql_values += words[215].strip().replace(',', '') + ","
                        sql_values += words[216].strip().replace(',', '') + ","
                        sql_values += words[217].strip().replace(',', '') + ","
                        sql_values += words[218].strip().replace(',', '') + ","
                        sql_values += words[219].strip().replace(',', '') + ","
                        sql_values += sql_vlaues_tmp

                        sql = "insert into `surin`.`trn_populations_age` (" + sql_fields + ") values (" + sql_values + ");"

                        curr.execute(sql)
                        conn.commit()

                    except pymysql.err.IntegrityError as e:
                        sql_values = "25" + str(year) + ","
                        sql_values += "'" + place + "',"
                        sql_values += "10,"
                        sql_values += "null,"
                        sql_values += "null,"
                        sql_values += words[205].strip().replace(',', '') + ","
                        sql_values += words[206].strip().replace(',', '') + ","
                        sql_values += words[207].strip().replace(',', '') + ","
                        sql_values += words[208].strip().replace(',', '') + ","
                        sql_values += words[209].strip().replace(',', '') + ","
                        sql_values += words[210].strip().replace(',', '') + ","
                        sql_values += words[211].strip().replace(',', '') + ","
                        sql_values += words[212].strip().replace(',', '') + ","
                        sql_values += words[213].strip().replace(',', '') + ","
                        sql_values += words[214].strip().replace(',', '') + ","
                        sql_values += words[215].strip().replace(',', '') + ","
                        sql_values += words[216].strip().replace(',', '') + ","
                        sql_values += words[217].strip().replace(',', '') + ","
                        sql_values += words[218].strip().replace(',', '') + ","
                        sql_values += words[219].strip().replace(',', '') + ","
                        sql_values += sql_vlaues_tmp

                        sql = "insert into `surin`.`trn_populations_age` (" + sql_fields + ") values (" + sql_values + ");"

                        curr.execute(sql)
                        conn.commit()

                    print("25" + str(year) + " => " + row[1] + " => " + place)
