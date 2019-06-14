//var str = "Hello, Swift."
//print(str)
//func max(arr1:[Int])->(min:Int, max:Int){
//    var _max = 0
//    var _min = arr1[0]
//    for item in arr1{
//        if(_max<item){
//            _max = item
//        }
//        if(_min > item){
//            _min = item
//        }
//    }
//    return (_min, _max)
//}
//var arr:[Int] = [10,20,30]
//print(arr)
//var res = max(arr1:arr)
//print(res)

import Foundation
func currentTimeInterval() -> Int64 {
    let now = Date()
    let timeInterval: TimeInterval = now.timeIntervalSince1970
    return Int64(timeInterval)
}
func currentTimeInterval1() -> Int64 {
    let now = Date()
    let timeInterval: TimeInterval = now.timeIntervalSince1970
    return Int64(round(timeInterval*1000))
}

func gcd(a:Int, b:Int)->Int{
    if(b > 0){
        return gcd(a:b, b:a%b)
    }
    else{
        return a
    }
}
var ans = [Int](repeating:0, count:1000)
var ao:Int = 0
var out = [Int](repeating:0, count:1000)
var oo:Int = 0
func sizeof(arr:[Int])->Int{
    var len:Int = 0
    for item in arr {
        if(item > 0){
            len += 1
        }
        if(item == 0){
            return len
        }
    }
    return len
}
func memcpy(arr2:[Int], l:Int)->[Int]{
    var i = 0
    var arr1 = [Int](repeating: 0, count: l)
    repeat {
//        print("i=", i, "l=",l)
        arr1[i] = arr2[i]
        i+=1
    }while(i<l)
    return arr1
}
func dfs(limit:Int, h:Int, ma:Int, mb:Int){
    if(h == limit){
        return
    }
    if (mb%ma == 0 && mb/ma > ans[ao-1] && (oo<=0 || mb/ma < out[oo-1])) {
        ans[ao] = mb/ma
        ao += 1
        oo = ao
        out = memcpy(arr2:ans, l:sizeof(arr:ans))
        ao -= 1
        return
    }
    var i:Int = mb/ma - 1
    if ao < 1 {
        i = 0
    } else {
        if(i <= ans[ao-1]){
        i = ans[ao-1]
        }
    }
    let j:Int = (limit - h) * mb/ma
    repeat{
        i+=1
        if(oo > 0 && i >= out[oo-1]){
            return
        }
        if(i>10000000 || mb>10000000){
            continue
        }
        let g:Int = gcd(a:i, b:mb)
        let k:Int = i/g
        let x:Int = mb*k
        let y:Int = ma*k - mb/g
        if(y < 0){
            continue
        }
        ans[ao] = i
        ao += 1
        if(y == 0){
            oo = ao
            out = memcpy(arr2:ans, l:sizeof(arr:ans))
            ao -= 1
            return
        }
        dfs(limit:limit, h:h+1, ma:y, mb:x)
        ao -= 1
    }while (i <= j)
}
//print(sizeof(arr:ans))
//var a:[Int] = [1,2,3]
//var b:[Int] = [0,0,0]
//b = memcpy(arr2:a, l:sizeof(arr:a))
//print(b)
func log(a:Int, b:Int){
    let curT = currentTimeInterval1()
    ao = 0
    oo = 0
    var i:Int = 0
    repeat{
        dfs(limit:Int(i), h:0, ma:a, mb:b)
        if(oo > 0){
            break
        }
        i += 1;
    }while (i<100)
    
    i=0
    repeat{
        print(out[i])
        i += 1;
    }while (i<oo)
    print("t:", Double(currentTimeInterval1() - curT)/1000);
}

//log(a:2, b:3)
//log(a:907, b:911)
//log(a:523, b:547)
log(a:1107, b:1153)
