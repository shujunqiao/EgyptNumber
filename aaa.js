var aaa = {}

var astr = "hello";

// 获取当前的毫秒
var getCurSec = function(){
    var data = new Date().getTime();
    return  data;
}
var toSec = function(ms){
    return (ms/1000).toFixed(3);
}

// console.log(astr + "-321");
var gcd = function(a, b){
    return b ? gcd(b,a%b) : a;
}

var ans = [];
var a0;
var out = [];
var oo;
var dfs = function(limit, h, ma, mb){
    // console.log("dfs limit", limit, h, ma, mb, ao, ans);
    if(h == limit) return;
    if(mb%ma == 0 && parseInt(mb/ma)>ans[ao-1] &&( oo<=0 || parseInt(mb/ma) < out[oo-1]))
    {
        ans[ao++] = parseInt(mb/ma);
        oo = ao;
        out = aaa.deepcopy(ans);
        // console.log("dfs:", out, ans);
        ao--;
        // console.log("dfs limit, mb%ma", mb%ma, mb/ma, ans[ao-1], out[oo-1], ao, oo, ans, out);
        return
    }
    var i=parseInt(mb/ma)-1;
    // console.log("ans i:", i, ao, ans);
    if(i<=ans[ao-1]) i=ans[ao-1]; //ans[ao-1]就是前面找过的最后一个，这前面的都处理过（选中or不选中）
    var j=parseInt((limit-h)*mb/ma);
    // console.log("will while i:", i, j, oo, ans);
    while(++i<=j)
    {
        // console.log("while i:", i, j, oo, out)
        if(oo>0&&i>=out[oo-1]) return ;
        var g=gcd(i,mb);
        var k=parseInt(i/g);
        var x=mb*k;
        var y=ma*k-parseInt(mb/g);
        if(y<0) continue;
        ans[ao++]=i;
        if(y==0)
        {
            oo=ao;
            // memcpy(out,ans,sizeof(ans));
            out = aaa.deepcopy(ans);
            ao--;
            return ;
        }
        // console.log(" x:", x, y)
        dfs(limit,h+1,y,x);
        ao--;
    }
}

aaa.testdfs = function(a,b){
    ao=0;
    oo=0;

    ans = [];
    out = [];

    console.log("testdfs, a:", a, b, ans, out);
    var cur = getCurSec();
    for(var i=1;i<100;i++)
    {
        //printf("%d\n",i);
        dfs(i,0,a,b);
        if(oo>0) break;
    }
    var tempT = toSec(getCurSec() - cur)
    console.log("out:", out, "time:", tempT);
    // for(var i=0;i<oo;i++)
    // {
    //     if(i!=0) printf(" ");
    //     console.log("%d",out[i]);
    // }
    // printf("\n");
    return tempT;
}
aaa.testdfs2 = function(num){
    var temp = 0;
    var a,b;
    for (var i = 1; i < 100; i++) {
        for (var j = i+1; j < 101; j++) {
            var tempT = aaa.testdfs(parseInt(num)+i, parseInt(num)+j)
            tempT = parseFloat(tempT)
            if (temp < tempT) {
                temp = tempT;
                a = parseInt(num) + i;
                b = parseInt(num) + j;
            };
        }
    };
    console.log("testdfs2, a", a, b, temp)
}

var result_num = 0;
// var arr = [11, 12, 12, 3, 3];
// for (item in arr) {
// 	result_num = result_num ^ arr[item];
// 	console.log(" ... result:" + result_num + ", item:" + arr[item]);
// }

// console.log("222 ... result:" + result_num);

// console.log("time:" + Math.round(new Date().getTime()));

var sortfunc = function (a, b) {
    return a>b;
};
var sortfunc2 = function (a, b) {
    return a<b;
};
var isBigArr = function(a1, a2){
    // console.log("isBigArr", a1, a2);
    var len = a1.length < a2.length && a1.length || a2.length;
    a1.sort(sortfunc2);
    a2.sort(sortfunc2);
    for(var i=0; i<len; i++){
        if(a1[i] > a2[i]){
            return true;
        }
        else if(a1[i] < a2[i]){
            return false;
        }
    }
    return false;
}

var getMinItem = function(arr){
    var a0 = arr[0];
    for(var i = 1; i < arr.length; i++){
        // console.log("getMinItem", i, arr[i], a0);
        if(isBigArr(a0, arr[i])){
            a0 = arr[i];
        }
    }
    return a0;
}

var sortfuncArr = function (a, b) {
    return isBigArr(a, b);
};

// list: 原数组, indexList：需要移除索引的数组
aaa.removeInArray = function(list, indexList){
    if(list == null) return;
    indexList.sort(function (a, b) {
        return b-a;
    });

    for (var i=0; i<indexList.length; i++) {
        list.splice(indexList[i], 1);
    }
};


// for gcd
aaa.gcd = function(a, b){
	var m;
    while(a!=0)
    {
        m=b%a;
        b=a;
        a=m;
    }
    return b;
};

aaa.getfirst = function(a, b){
	var i;
    for(i=2;;i++)
    {
        if(b<a*i)
        {
            break;
        }
    }
    return i;
};

var maxd = 0;
var v = [], ans = [];//v是暂时存放的满足题意的分母的数组，ans是记录满足题意的最优分母值的数组。

aaa.better = function(d){
	var i;
    var flag = true;
    if(ans[d]==-1)//由于初始化ans是-1，如果是第一次出现的满足题意的解，返回true
        return true;
    for(i=d;i>=0;i--)
    {
        if(v[i]==ans[i])//从高位进行判断大小，题意要求
            continue;
        else if(v[i]>ans[i])
        {
            //return false;
            flag=false;
            break;
        }
        else
        {
            break;
        }
    }
    if(flag==true)
        return true;
    else
        return false;
};

aaa.deepcopy = function(obj) {
    var out = [],i = 0,len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array){
            out[i] = aaa.deepcopy(obj[i]);
        }
        else out[i] = obj[i];
    }
    return out;
};

aaa.max = function(a, b){
    return a>b && a || b;
};

aaa.dfs = function(a, b, from, d)//深度为d
{
    // console.log("dfs:", a, b, from, d, maxd);
    var aa,bb,g,i;
    var ok;
    if(d==maxd)
    {
        if(a!=1)
            return false;
        for(i=0;i<=d-1;i++)
        {
            // console.log("dfs:, d", d, maxd, i);
            if(v[i]==b)
            {
                return false;
            }
        }
        v[d]=b;
        // console.log("dfs:, v", v, b);
        // sort(v,v+d);
        v.sort(sortfunc);
        if(aaa.better(d))
            // memcpy(ans,v,sizeof(int64_t)*(d+1));
            ans = aaa.deepcopy(v);
        return true;
    }
    ok=false;
    //重要！！！
    // console.log("dfs:, 0 from", maxd, from,aaa.getfirst(a,b));
    from=aaa.max(from,aaa.getfirst(a,b));//枚举起点，去上一次加一的分母值和比a/b小的最大分数的分母中更大的。
    // console.log("dfs:, 1 from", from);
    for(i=from;;i++)
    {
        //剪枝，如果c/d（前i个分数之和）+1/e*（maxd-i）<a/b，可以直接break;
        if(b*(maxd+1-d)<=a*i)
            break;
        v[d]=i;
        aa=a*i-b;
        bb=b*i;
        g=aaa.gcd(aa,bb);
        aa=aa/g;
        bb=bb/g;//约分
        // console.log("dfs:, from a", v[d], aa, bb, g);
        if(aaa.dfs(aa,bb,i+1,d+1))
            ok=true;
    }
    return ok;
}

aaa.dealAB = function(a,b){
    if(!a || a <= 0 || !b || b <= 0)
    {
        console.log("a:" + a + ", b:" + b);
        return;
    }

    var aa,bb,i,g;

    ans = [];
    for(var i = 0; i < 10; i++){
        ans[i] = -1;
    }

    g = aaa.gcd(a,b);
    aa = a/g;
    bb = b/g;
    if(aa==1)
    {
        console.log("%d/%d=%d/%d\n",a,b,aa,bb);
    }
    else
    {
        for(maxd=1;maxd<10;maxd++)
        {
            // console.log("maxd:", maxd);
            if(aaa.dfs(aa,bb, aaa.getfirst(aa,bb),0))
                break;
        }
        ans.sort(function(a,b){return a>b;});
        console.log("ans", ans);
        // console.log(a+"/"+b+"=");
        // for(i=0;i<=maxd-1;i++)
        //     console.log("1/" + ans[i] + "+");
        // console.log("1/" + ans[i]);
    }
}


global.aaa = aaa;

var hasSampleElement = function(arr){
    if (typeof(arr) != typeof([]))
        return false
    for(i in arr){
        if (typeof(arr[i]) == "object"){
            arr[i].sort();
        }
    }
    arr.sort();
    for (idx=0; idx<arr.length-1; idx++)
        if (arr[idx] == arr[idx+1])
            return true
    return false
}

var isEqual = function(a,b){
    if(typeof(a) != "object"){
        return a == b;
    }
    if(a == undefined || b == undefined){
        return false;
    }
    if(a.length != b.length){
        return false;
    }
    a.sort();
    b.sort();
    for(i=0; i<a.length; i++){
        if(!isEqual(a[i],b[i])){
            return false;
        }
    }
    return true;
}

var arr_count = function(arr, item){
    var c = 0;
    for(var i=0; i<arr.length; i++){
        if(isEqual(arr[i], item)){
            c ++;
        }
    }
    return c;
}

var clean_arr = function(arr){
    if(arr.length <= 1){
        return;
    }
    // console.log("clean_arr 000", arr);
    for(var item=0; item<arr.length; item++)
        arr[item].sort();
    for(var item=0; item<arr.length; item++){
        if (hasSampleElement(arr[item])){
            var t_item = arr[item];
            while (arr_count(arr, t_item)>0){
                arr.splice(item, 1);
            }
        }
    }
    // console.log("clean_arr 222", arr);
    for(var idx =0; idx<arr.length; idx++){
        if(idx < arr.length){
            while (arr_count(arr, arr[idx])>1){
                arr.splice(idx, 1);
            }
        }
    }
    // console.log("clean_arr 333", arr);
}

// 比较两个分数的大小，用0表示分子，1表示分母
var isLess = function(a1, a2){
    return a1[0]*a2[1] < a1[1]*a2[0];
}

//
var sumOfN = function(num, n){
    var num_2 = num
    var num_1 = 0
    // console.log("sumOfN", num, n)
    for (x = 1; x < n; x++)
        num_2 *= x+num
    // console.log("sumOfN 222", num_2)
    for (x = 0; x < n; x++)
        num_1 += num_2/(x+num)
    // console.log("sumOfN 111", num_1)
    gcdN = aaa.gcd(num_1,num_2)
    // console.log("sumOfN gcdN", gcdN)
    return [num_1/gcdN, num_2/gcdN]
}

aaa.testDealAB = function(a,b){
    if(a == undefined)
        // a = 1107;
        // a = 19;
        a = 9998;
    if(b == undefined)
        // b = 1151;
        // b = 45;
        b = 10001;

    console.log("testDealAB", a, b);
    var cur = getCurSec();
    aaa.dealAB(a, b);
    console.log("testDealAB", "time:", toSec(getCurSec() - cur));
}

aaa.testFunc = function(a,b){
    console.log("testFunc", a, b);
    // var arr = [[1,2,1]];
    // var arr = [[1,2],[1,2,3],[1,2,1]];
    // var arr = [[1,2],[2,1],[1,2,3],[1,2,1]];
    // clean_arr(arr);
    // var arr = aaa.getGoodDivByCount(2,3);
    // console.log("testFunc", arr);

    // good result

    var cur = getCurSec();
    var arr = aaa.getGoodDivByCount(a,b);
    console.log("testFunc", arr, "time:", toSec(getCurSec() - cur));

    // var arr = aaa.getGoodDivByCount(19, 45);
    // console.log("testFunc", arr);
    // var arr = [6,3,7,2, 32, 313];
    // arr.sort(sortfunc2);
    // console.log("arr", arr);

    // test sort arr
    // a.sort(sortfuncArr);

    // var a1 = [ 35964, 18711, 44, 7, 3, 2 ];
    // var a2 = [ 259740, 185, 13, 6, 4, 2 ];
    // var a3 = [ 109890, 220, 20, 9, 3, 2 ];
    // console.log(isLess(a1, a2), isLess(a2,a3), isLess(a1,a3));

    // clean_arr(a);

    // console.log("isLess", isLess([1,2], [2,3]));
    // console.log("sumOfN", sumOfN(1, 4));
    // console.log("subRest", subRest(5, 7, 2));
    // clean_arr();
    // console.log("testFunc:", isEqual([1,2],[2,1]), typeof([]), (typeof([]) != "object"));
}


// my resolution.
var subRest = function(num1,num2,minN){
    num_1 = num1*minN - num2
    num_2 = num2*minN
    gcdN = aaa.gcd(num_1,num_2)
    return [num_1/gcdN, num_2/gcdN]
}

aaa.getAllDN = function(num1, num2, n){
    var arr = [];
    if (num1 == 1) {
        arr.push([num2]);
        return arr;
    };

    // console.log("getAllDN", num1, num2, n);
    for (var x = 1; x < num2/n + num1; x++) {
        // console.log("getAllDN x", x, num2/n + num1, [num1,num2]);
        // console.log( sumOfN(x,n));
        if (! isLess([num1,num2], sumOfN(x,n))) {
            break;
        }
        // console.log("getAllDN 000");
        if (isLess([num1, num2], [1,x])) {
            continue;
        }
        else{
            // console.log("getAllDN 111");
            res = subRest(num1, num2, x);
            if (n == 2) {
                if (res[0] == 1) {
                    arr.push([x, res[1]]);
                };
                // console.log("getAllDN 222");
            }
            else{
                var arr_t = aaa.getAllDN(res[0], res[1], n - 1)
                for (item in arr_t) {
                    arr_t[item].push(x);
                    arr.push(arr_t[item]);
                }
                // console.log("getAllDN 333");
            }
        }
    }
    // console.log("getAllDN 444", arr);
    clean_arr(arr);
    // console.log("getAllDN 555", arr);
    return arr;
}

aaa.getGoodDiv = function(arr){
    // for (var item=0; item<arr.length; item ++)
    //     arr[item].reverse()

    // for(var i=0; i<arr.length; i++){
    //     arr[i].sort(sortfunc2)
    // }
    // console.log("getGoodDivByCount, 000 arr", arr);
    // arr.sort(sortfuncArr)
    // // arr[0].sort(sortfunc)
    // console.log("getGoodDivByCount, 111 arr", arr);
    // return arr[arr.length - 1];
    // return arr[0];
    return getMinItem(arr).sort(sortfunc);
};

var MAX_N = 10;
aaa.getGoodDivByCount = function(num1,num2){
    arr = []
    base_n = 2
    while (arr.length == 0){
        if (base_n > MAX_N){
            console.log( "Can't find good group.");
            return arr
        }
        arr = aaa.getAllDN(num1, num2, base_n)
        if (arr.length > 0){
            clean_arr(arr)
            return aaa.getGoodDiv(arr)
        }
        base_n += 1
    }
    return []
};

// // 关于闭包001
// var add = function () {
//     var counter = 0;

//     var b = function () {
//     	counter += 1
//     	console.log("... counter:" + counter);
//     	return counter;
//     }

//     return b
// };

// var c = add()     	// 返回的是a的内部函数b， 此时 a里面的counter 初始化了一次，并常驻于内存中
// c();				// 执行函数b
// c();
// c();
// // 1：可调用函数内部的变量；2：可使变量一直存在于内存；3：闭包不适合比较大的函数；4：使内存使用增加，可能会造成内存泄漏；
// console.log("... add:" + c() );

// Error loading syntax file "Packages/JavaScript/JavaScript.tmLanguage": Unable to open Packages/JavaScript/JavaScript.tmLanguage
