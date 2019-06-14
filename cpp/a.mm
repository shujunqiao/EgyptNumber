//
//  a.cpp
//  HelloCpp
//
//  Created by 乔书军 on 2019/6/12.
//  Copyright © 2019 qwe. All rights reserved.
//

#include "a.hpp"

int gcd1(int a,int b)
{
    return b?gcd1(b,a%b):a;
}

int ans1[1000],ao1;
int out1[1000],oo1;

void dfs1(int limit,int h,int ma,int mb)
{
    if(h==limit)
        return;
//    printf("dfs1 000:%d %d %d %d\n", limit, h, ma, mb);
    if(mb%ma==0 && mb/ma>ans1[ao1-1] && ( oo1<=0 || mb/ma < out1[oo1-1] ))
    {
        ans1[ao1++]=mb/ma;
        oo1=ao1;
        memcpy(out1,ans1,sizeof(ans1));
        ao1--;
        return ;
    }
    int i=mb/ma-1;
    if(ao1 < 1)
        i = 0;
    else if(i<=ans1[ao1-1])
        i=ans1[ao1-1]; //ans1[ao1-1]就是前面找过的最后一个，这前面的都处理过（选中or不选中）
    int j=(limit-h)*mb/ma;
    while(++i<=j)
    {
        if(oo1>0&&i>=out1[oo1-1])
            return ;
        int g=gcd1(i,mb);
        int k=i/g;
        //if(ma*i/mb+h>limit) return ;
        int x=mb*k;
        int y=ma*k-mb/g;
        if(y<0) continue;
        ans1[ao1++]=i;
        if(y==0)
        {
            oo1=ao1;
            memcpy(out1,ans1,sizeof(ans1));
            ao1--;
            return ;
        }
        dfs1(limit,h+1,y,x);
        ao1--;
    }
}

void logNum(int a, int b){
    ao1=0;
    oo1=0;
    for(int i=1;i<100;i++)
    {
        printf("%d, oo=%d\n",i, oo1);
        dfs1(i,0,a,b);
        if(oo1>0) break;
    }
    for(int i=0;i<oo1;i++)
    {
        if(i!=0) printf(" ");
        printf("%d",out1[i]);
    }
    printf("\n");
}
