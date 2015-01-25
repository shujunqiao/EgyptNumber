#!/usr/bin/env python
# -*- coding: utf-8 

import sys
import time

MAX_N = 10

input_num1 = 2
input_num2 = 3
input_n = 2

args = sys.argv
if len(args) > 1:
	input_num1 = int(args[1])
if len(args) > 2:
	input_num2 = int(args[2])
if len(args) > 3:
	input_n = int(args[3])

def gcd(a, b):
	if a < b:
		a, b = b, a
	while b != 0:
		temp = a % b
		a = b
		b = temp
	return a
def subRest(num1,num2,minN):
	num_1 = num1*minN - num2
	num_2 = num2*minN
	gcdN = gcd(num_1,num_2)
	return num_1/gcdN, num_2/gcdN

def isLess(tr1, tr2):
	return tr1[0]*tr2[1] <= tr1[1]*tr2[0]

def sumOfN(num,n):
	num_2 = num
	num_1 = 0
	for x in xrange(1,n):
		num_2 *= x+num
	for x in xrange(0,n):
		num_1 += num_2/(x+num)
	gcdN = gcd(num_1,num_2)
	return num_1/gcdN, num_2/gcdN

def hasSampleElement(arr):
	if type(arr) != type([]):
		return False
	for idx in xrange(0,len(arr)-1):
		if arr[idx] == arr[idx+1]:
			return True
	return False

def clean_arr(arr):
	for item in arr:
		item.sort()
	for item in arr:
		if hasSampleElement(item):
			while arr.count(item)>0:
				arr.remove(item)
	for idx in xrange(0,len(arr)):
		if idx < len(arr):
			while arr.count(arr[idx])>1:
				arr.remove(arr[idx])

def getAllDiv2(num1,num2,n):
	arr = []
	for x in xrange(1,int(num2/n)+num1):
		if isLess((num1,num2),(1,x)):
			continue
		else:
			res = subRest(num1, num2, x)
			if res[0] == 1:
				arr.append([x, res[1]])
	return arr

def getAllDiv3(num1,num2,n):
	arr = []
	for x in xrange(1,int(num2/n)+num1):
		if isLess((num1,num2),(1,x)):
			continue
		else:
			res = subRest(num1, num2, x)
			arr_t = getAllDiv2(res[0], res[1], n-1)
			for item in arr_t:
				item.append(x)
				arr.append(item)
	return arr

def getAllDN(num1,num2,n):
	arr = []
	if num1 == 1:
		arr.append([num2])
		return arr
	for x in xrange(1,int(num2/n)+num1):
		if not isLess((num1,num2),sumOfN(x,n)):
			break
		if isLess((num1,num2),(1,x)):
			continue
		else:
			res = subRest(num1, num2, x)
			if n==2:
				if res[0] == 1:
					arr.append([x, res[1]])
			else:
				arr_t = getAllDN(res[0], res[1], n-1)
				for item in arr_t:
					item.append(x)
					arr.append(item)
	clean_arr(arr)
	return arr

def getGoodDiv(arr):
	for item in arr:
		item.reverse()
	arr.sort()
	arr[0].sort()
	return arr[0]
def getGoodDivByCount(num1,num2):
	arr = []
	base_n = 2
	while len(arr) == 0:
		if base_n > MAX_N:
			print "Can't find good group."
			return arr
		arr = getAllDN(num1, num2, base_n)
		if len(arr) > 0:
			clean_arr(arr)
			return getGoodDiv(arr)
		base_n += 1
	return []
timeBegin = time.time()
print getGoodDivByCount(input_num1, input_num2)
timeEnd = time.time()
print timeEnd - timeBegin

