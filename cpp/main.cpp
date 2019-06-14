//
//  main.cpp
//  HelloCpp
//
//  Created by 乔书军 on 2019/6/1.
//  Copyright © 2019 qwe. All rights reserved.
//

#include <iostream>

//int main(int argc, const char * argv[]) {
//    // insert code here...
//    std::cout << "Hello, World!\n";
//    return 0;
//}
#include<stdio.h>
#include<string.h>
#include<stdlib.h>

#include<sys/timeb.h>

#include "a.hpp"

long long getSystemTime() {
    struct timeb t;
    ftime(&t);
    return 1000 * t.time + t.millitm;
}
void GetTickCount(){
//    struct tm *ptminfo;
//    time_t rawtime;
//    time(&rawtime);
//    ptminfo = localtime(&rawtime);
//    printf("current: %02d-%02d-%02d %02d:%02d:%02d\n",
//           ptminfo->tm_year + 1900, ptminfo->tm_mon + 1, ptminfo->tm_mday,
//           ptminfo->tm_hour, ptminfo->tm_min, ptminfo->tm_sec);
   
//    log();
//    struct timeval tv;
//    gettimeofday(&tv,NULL);
}

int gcd(int a,int b)
{
    return b?gcd(b,a%b):a;
}

int ans[1000],ao;
int out[1000],oo;

void dfs(int limit,int h,int ma,int mb)
{
    if(h==limit) return;
    //printf("dfs 000:%d %d %d %d\n", limit, h, ma, mb);
    if(mb%ma==0 && mb/ma>ans[ao-1] && ( oo<=0 || mb/ma < out[oo-1] ))
    {
        ans[ao++]=mb/ma;
        oo=ao;
        memcpy(out,ans,sizeof(ans));
        ao--;
        return ;
    }
    int i=mb/ma-1;
    if(i<=ans[ao-1])
        i=ans[ao-1]; //ans[ao-1]就是前面找过的最后一个，这前面的都处理过（选中or不选中）
    int j=(limit-h)*mb/ma;
    while(++i<=j)
    {
        if(oo>0&&i>=out[oo-1])
            return ;
        int g=gcd(i,mb);
        int k=i/g;
        //if(ma*i/mb+h>limit) return ;
        int x=mb*k;
        int y=ma*k-mb/g;
        if(y<0) continue;
        ans[ao++]=i;
        if(y==0)
        {
            oo=ao;
            memcpy(out,ans,sizeof(ans));
            ao--;
            return ;
        }
        dfs(limit,h+1,y,x);
        ao--;
    }
}

int main()
{
    int a,b;
    long long t_start, t_end;
    while(scanf("%d/%d",&a,&b)!=EOF)
    {
        t_start = getSystemTime();
        logNum(a, b);
        t_end = getSystemTime();
        unsigned int inv = t_end - t_start;
        printf("time:%000f\n", inv/1000.0f);
    }
    return 0;
}

