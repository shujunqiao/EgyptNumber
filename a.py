#!/usr/bin/python
import copy
import sys
import time
def gcd(a, b):
	if b>0:
		return gcd(b, a%b)
	return a

ans = []
ao = 0
out = []
oo = 0
def dfs(limit, h, ma, mb):
	global ao, oo, ans, out
	# print 'dfs 000:', limit, h, ma, mb
	if h == limit:
		return
	if mb%ma == 0 and mb/ma > ans[ao-1] and (oo<=0 or mb/ma < out[oo-1]):
		if len(ans) <= ao:
			ans.append(mb/ma)
		else:
			ans[ao] = mb/ma
		oo = ao + 1
		out = copy.deepcopy(ans)
		return
	i = mb/ma - 1
	if ao < 1:
		i = 0
	else:
		if i<=ans[ao-1]:
			i=ans[ao-1]
	j = (limit-h)*mb/ma

	while True:
		i += 1
		if oo>0 and (len(out)>= oo and i>=out[oo-1]):
			return
		if i>1000000 or mb > 10000000:
			break
		g = gcd(i, mb)
		k = i/g
		x = mb*k
		y = ma*k - mb/g
		if y < 0:
			continue
		if len(ans) <= ao:
			ans.append(i)
		else:
			ans[ao] = i
		ao += 1
		if y == 0:
			oo = ao
			out = copy.deepcopy(ans)
			ao -= 1
			return
		dfs(limit, h+1, y, x)
		ao -= 1
		if i > j:
			return

def log(a, b):
	global ao, oo
	ao = 0
	oo = 0
	for i in xrange(1,10):
		# print "i=", i, oo
		dfs(i, 0, a, b)
		if oo > 0:
			break
	print(out)
	print time.clock()

args = sys.argv
a = 4
if len(args) > 1:
	a = int(args[1])
b = 6
if len(args) > 2:
	b = int(args[2])
print a, b
log(a, b)
#print(gcd(4,6))