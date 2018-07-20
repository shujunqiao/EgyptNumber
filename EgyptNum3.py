#!/usr/bin/env pypy
# -*- coding: utf-8

import copy
import time

MAXN = 20000
maxd = 0

v = []
ans = []   #//v是暂时存放的满足题意的分母的数组，ans是记录满足题意的最优分母值的数组。

def gcd(a, b): #//求最大公约数
    return b and gcd(b, a % b) or a

def getfirst(a, b):   #//取比a/b小的最大分数，分子必须为1
    for i in range(2,b/a+a):
        if(b<a*i):
            break
    return i

def better(d):   #//必要的判断，这组分数之和是否满足最优解
    global v,ans
    i = 0
    flag=True
    if(ans[d]==-1):   #//由于初始化ans是-1，如果是第一次出现的满足题意的解，返回true
        return True
    for i in range(d,-1,-1):     # i=d;i>=0;i--):
        if(v[i]==ans[i]):   #//从高位进行判断大小，题意要求
            continue
        elif(v[i]>ans[i]):
            flag=False
            break
        else:
            break
    if(flag==True):
        return True
    else:
        return False

# for x in xrange(3,-1,-1):
#     print x

def dfs(a, b, from_, d):    #//深度为d
    # print "dfs:", a, b, from_, d
    global maxd,ans,out,v
    aa=0
    bb=0
    g=0;i=0
    ok = False
    if(d==maxd):
        if(a!=1):
            return False
        for i in range(0,d):    #(i=0;i<=d-1;i++)
            if(v[i]==b):
                return False
        if len(v) <= d:
            v.append(b)
        else:
            v[d]=b
        # sort(v,v+d)
        if(better(d)):
            # memcpy(ans,v,sizeof(int64_t)*(d+1))
            ans = copy.deepcopy(v)
        return True

    ok=False
    # //重要！！！
    from_=max(from_, getfirst(a,b))   #//枚举起点，去上一次加一的分母值和比a/b小的最大分数的分母中更大的。
    i = from_-1
    while i:  #(i=from;;i++):
        # //剪枝，如果c/d（前i个分数之和）+1/e*（maxd-i）<a/b，可以直接break;
        i += 1
        if(b*(maxd+1-d)<=a*i):
            break
        if len(v) <= d:
            v.append(i)
        else:
            v[d]=i
        aa=a*i-b
        bb=b*i
        g=gcd(aa,bb)
        aa=aa/g
        bb=bb/g     #//约分
        if(dfs(aa,bb,i+1,d+1)):
            ok=True
    return ok

def testDfs(a,b):
    aa=0;bb=0;i=0;g=0;
    global maxd,ans

    if(a==0):
        print a, "/", b, "=0"
    # memset(ans,-1,sizeof(ans));
    ans = []
    for x in xrange(1,10):
        ans.append(-1)
    g=gcd(a,b)
    aa=a/g
    bb=b/g
    if(aa==1):
        print("%d/%d=%d/%d\n",a,b,aa,bb)
    else:
        # for(maxd=1;;maxd++):
        maxd = 0
        while 1:
            maxd += 1
            if(dfs(aa,bb,getfirst(aa,bb),0)):
                break
        print "ans", ans

timeBegin = time.time()
# testDfs(19,45)
# testDfs(523, 547)
# testDfs(907, 911)
# testDfs(1107, 1151)
testDfs(9998, 10001)
print time.time() - timeBegin