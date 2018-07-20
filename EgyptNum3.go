//!/usr/bin/env pypy
// -*- coding: utf-8

package main

import (
    "fmt"
    "time"
)

var (
    v = []int{-1,-1,-1}
    ans []int
    MAXN int = 20000
    maxd int = 0
    aa int = 0
    bb int = 0
    //i int = 0
)

func main() {
    var a int
    a = 13
    fmt.Printf("a = %d, %d, %d\n", a, gcd(16,20), getfirst(3,7))
    var t1 = time.Now()
    //testdfs(19, 45)
    //testdfs(119, 453)
    //testdfs(998, 999)
    //testdfs(1107, 1151)
    // testdfs(1021, 1093)
    testdfs(901, 907)//   (140s)
    // testdfs(906, 907)  （48s）
    // testdfs(1023, 1033)
    // testdfs(9998, 10001)
    fmt.Println(time.Since(t1), ans)
}

func gcd(a int, b int) int {    //求最大公约数
   // return b ? gcd(b, a % b) || a
   if b == 0 {
       return a
   }
   return gcd(b, a % b)
}

func copy1(src []int)[]int {
    var dst []int
    for i:=0; i<len(src); i++ {
        dst = append(dst, src[i])
    }
    return dst
}

func max(a int, b int) int {
    if(a>b){
        return a
    }
    return b
}

func getfirst(a int, b int) int{  // #//取比a/b小的最大分数，分子必须为1
    var i int=1
    for i:=2;;i++ {         //range(2,b/a+a):
        if(b<a*i){
            return i
        }
    }
    return i
}

func better(d int) bool{     //必要的判断，这组分数之和是否满足最优解
    // var i int = 0
    var flag bool =true
    if(ans[d]==-1){   //由于初始化ans是-1，如果是第一次出现的满足题意的解，返回true
        return true
    }
    for i:=d;i>-1;i-- {   // in range(d,-1,-1):     //# i=d;i>=0;i--):
        if(v[i]==ans[i]){   //从高位进行判断大小，题意要求
            continue
        }else if(v[i]>ans[i] && ans[i]>0){
            flag=false
            break
        }else{
            break
        }
    }
    if(flag==true){
        return true
    }else{
        return false
    }
}

func dfs2(a int, b int, from int, d int) bool {   // #//深度为d
    //fmt.Println("dfs:", a, b, from, d)
    var aa int=0
    var bb int=0
    var g int=0
    //var i int=0
    var ok = false
    if a<0 || b<0 {
        return false
    }
    // 遍历到当前深度时
    if(d==maxd){
        // 如果分子不为1，则不是解
        if(a!=1){
            return false
        }
        // 如果在已保存的一组解v中包含 分母，则已久不是最优解，或已得到最优解
        for i:=0; i<d; i++{     //in range(0,d){    //(i=0;i<=d-1;i++)
            if(v[i]==b){
                return false
            }
        }
        // 反之，则将分母加入到数组v中
        if len(v) <= d{
            v = append(v, b)
            //if b<0 {
            //    fmt.Println("b", b, v)
            //}
        }else{
            v[d]=b
        }
        // # sort(v,v+d)
        // v解与当前报错的解进行比较哪个是更优解
        if(better(d)){
            ans = copy1(v)
        }
        return true
    }

    ok=false
    //重要！！！
    //枚举起点，去上一次加一的分母值和比a/b小的最大分数的分母中更大的。
    from=max(from, getfirst(a,b))
    for i:=from-1;;i++{
        //剪枝，如果c/d（前i个分数之和）+1/e*（maxd-i）<a/b，可以直接break;
        //i += 1
        if(b*(maxd+1-d)<=a*i){
            break
        }
        if len(v) <= d{
            v = append(v, i)
        }else{
            v[d]=i
        }
        aa=a*i-b
        bb=b*i
        g=gcd(aa,bb)
        aa=aa/g
        bb=bb/g     //约分
        // 递归求解
        if(dfs2(aa,bb,i+1,d+1)){
            ok=true
        }
    }
    return ok
}

func testdfs(a int ,b int){
    var aa int=0
    var bb int=0
    var g int=0

    if(a==0){
        fmt.Println(a, "/", b, "=0")
    }
    //# memset(ans,-1,sizeof(ans));
    //ans = []
    for x:=1;x<10;x++{        //x in xrange(1,10){
        ans = append(ans,-1)
    }
    g=gcd(a,b)
    aa=a/g
    bb=b/g
    if(aa==1){
        fmt.Println("%d/%d=%d/%d\n",a,b,aa,bb)
    }else{
        maxd = 1
        for {
            if maxd>10 {
                break
            }
            if( dfs2(aa,bb,getfirst(aa,bb),0)){
                break
            }
            maxd ++
        }
        fmt.Println("ans", ans)
    }
}
