#!/usr/bin/env python3
import sys
#income condition
if len(sys.argv)!=2:
   print("Parameter Eorror")
   exit()

try:
    income = int(sys.argv[1])
except ValueError:
    print("Parameter Eorror")
    exit()

#start to calculate
value = income - 3500
if value < 0:
    result = 0
if 0<value<=1500:
    result = value*0.03
if 1500<value<=4500:
    result = value*0.1-105
if 4500<value<=9000:
    result = value*0.2-555
if 9000<value<=35000:
    result = value*0.25-1005
if 35000<value<=55000:
    result = value*0.3-2755
if 55000<value<=80000:
    result = value*0.35-5505
if 80000<value:
    result = value*0.45-13505

#print xxx.00

print('%.2f' % (result))
    
