// #!/usr/bin/env go
package main

import (
	"fmt"
	"time"
)

var (
	ans = []int{0}
	ao int
	out []int
	//out []int = []int{0}
	oo int
)

func main() {
	ao = 0
	oo = 0

	var a int
	a = 13
	fmt.Printf("a = %d, %d\n", a, gcd(16,20))
	// testdfs(19, 45)
	// testdfs(119, 453)
    // testdfs(998, 999)
    // testdfs(523, 547)
    // testdfs(523, 587)
    testdfs(907, 971)
    // testdfs(1107, 1151)
    // testdfs(9998, 10001)
}

func gcd(a int, b int) int { 	//求最大公约数
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

func dfs(limit int, h int, ma int, mb int) {
    // fmt.Println("dfs limit", limit, h, ma, mb, ao, ans);
    if(h == limit){
    	return
    }
    if(mb%ma==0 && mb/ma>ans[ao-1] && ( oo<=0 || mb/ma < out[oo-1] )){
    	// fmt.Println("dfs, mb:", mb, ma, mb/ma, ao, ans)
		if len(ans)>ao {
			ans[ao]=mb/ma
		}else{
			ans = append(ans, mb/ma)
		}
		ao++
		oo=ao
		// memcpy(out,ans,sizeof(ans));
		out = copy1(ans)
		ao--
		return
    }
    var i int=mb/ma-1
    // fmt.Println("ans i:", i, ao, ans)
    if( ao>0 && i<=ans[ao-1]){
        i=ans[ao-1] //ans[ao-1]就是前面找过的最后一个，这前面的都处理过（选中or不选中）
    }else {
        if i<0 {
            i=1
        }
	}
    var j int=(limit-h)*mb/ma
	// fmt.Println("will while i:", i, j, oo, ans)
    // while(++i<=j)
    for {
        i++
        if(i>j){
            return
        }
        if(oo>0&&i>=out[oo-1]){
            return
        }
		// fmt.Println("while i:", i, j, oo, out)
        var g int=gcd(i,mb)
        var k int=i/g
        var x int=mb*k
        var y int=ma*k-mb/g
        if(y<0){
            continue
        }
		if len(ans)>ao {
			ans[ao]=i
		}else{
			ans = append(ans, i)
		}
        ao++
        if(y==0){
            oo=ao
            // memcpy(out,ans,sizeof(ans))
            out = copy1(ans)
            ao--
            return
        }
        // fmt.Println(" x:", x, y)
        dfs(limit,h+1,y,x)
        ao--
    }
}

func testdfs(a int, b int) {
    ao=0
    oo=0

	var t1 = time.Now()
    for i := 1;i<10;i++ {
        //printf("%d\n",i);
        dfs(i,0,a,b)
        if(oo>0){
        	break
        }
    }
	fmt.Println(time.Since(t1), out)
    // fmt.Println("out:", out, "time:", toSec(getCurSec() - cur));
    // for(var i=0;i<oo;i++)
    // {
    //     if(i!=0) printf(" ");
    //     fmt.Println("%d",out[i]);
    // }
    // printf("\n");
}