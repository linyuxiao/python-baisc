#!/usr/bin/env python3
#income condition
import sys
if len(sys.argv)!=2:
    print("Parameter Error")
    exit()

try:
    int(sys.argv[1])
except valueerror:
    print("Parameter Error")

#start to calculate
income = int(sys.argv[1])
value = income - 3500

if value < 0:
    result = 0
if 0 < value <= 1500:
    result = income*0.03
if 1500<value <= 4500:
    result = income*0.1 - 105
if 4500<value<=9000:
    result = income*0.2 - 555
if 9000<value<=35000:
    result = income*0.25 - 1005
if 35000<value<=55000:
    result = income*0.3 - 2755
if 55000<value<=80000:
    result = income*0.35 - 5505
if value>80000:
    result = income*0.45 - 13505

print('%.2' % (result))

