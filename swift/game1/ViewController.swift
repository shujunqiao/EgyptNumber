//
//  ViewController.swift
//  game1
//
//  Created by cocos2dx on 15-1-24.
//  Copyright (c) 2015年 cocos2dx. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    let MAX_LEN = 10

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
//        println(subRest(2,n2:3, num:2))
        var num1:Int32 = 19
        var num2:Int32 = 45
        let n:Int32 = 3
//        var arr = getAllDN(num1, num2: num2, n: n)
//        println(arr)
//        arr = clean_arr(arr)
//        println(arr)
//        println(getGoodDiv(arr))
        
        println("--BEGIN--")
        num1 = 67
        num2 = 101
        num1 = 221
        num2 = 233
        num1 = 998
        num2 = 999
        num1 = 907
        num2 = 911
        num1 = 523
        num2 = 547
        var t1 = time_t()
        time(&t1)
        println(clock())
//        println(gcd(8,n2: 2053737440))
//        num1 = 907
//        num2 = 911
        println(getGoodDivByCount(num1,num2:num2))
        var t2 = time_t()
        time(&t2)
        println(clock())
        println(t2-t1)
        println("--END--")
        
    }
    
    func log(num:Int32)->[Int]{
        print(num);
        let arr = [13]
        print(arr)
        return arr
    }
    
    func isLess(arr1:[Int64], arr2:[Int64]) ->Bool{
        let t1 = UInt64(arr1[0])*UInt64(arr2[1]);
        let t2 = UInt64(arr1[1])*UInt64(arr2[0]);
        
        return t1 <= t2
    }
    func gcd(n1:Int64, n2:Int64)->Int64{
        var a = n1
        var b = n2
        if n1 < n2{
            a = n2
            b = n1
        }
        while b>0{
            var temp = a % b
            a = b
            b = temp
        }
        return a
    }
    func sumOfN(num:Int64, n:Int64)->[Int64]{
        var num_2 = Int64(num)
        var num_1 = Int64(0)
        for x in 1...n-1{
            num_2 *= Int64(x+num)
        }
        for x in 0...n-1{
            num_1 += num_2/Int64(x+num)
        }
        let gcdN = gcd(num_1,n2:num_2)
        return [num_1/gcdN, num_2/gcdN]
    }
    
    func sortArr(arr:[Int64], reverse:Bool)->[Int64]
    {
        var arr_mid = arr
        for i in 0...arr.count-1{
            if ((arr.count-i-2) < 0) {
                break
            }
            for j in 0...arr.count-i-2{
                let v1:Int64 = arr_mid[j]
                let v2:Int64 = arr_mid[j+1]
                if reverse{
                    if( v1 < v2){
                        arr_mid[j] = v2
                        arr_mid[j+1] = v1
                    }
                }else{
                    if( v1 > v2){
                        arr_mid[j] = v2
                        arr_mid[j+1] = v1
                    }
                }
            }
        }
        
        return arr_mid
    }
    
    func hasSameElement(arr:[Int64])->Bool{
        for i in 0...arr.count-2{
            if((arr[i]) == (arr[i+1])){
                return true
            }
        }
        return false
    }
    
    func isLessArr(arr1:[Int64], arr2:[Int64])->Bool{
        if arr1.count > arr2.count{
            return false
        }else if arr1.count < arr2.count{
            return true
        }
        var a1 = sortArr(arr1, reverse: true)
        var a2 = sortArr(arr2, reverse: true)
        for i in 0...a1.count-1{
            if (a1[i] > a2[i]){
                return false
            }else if (a1[i] < a2[i]){
                return true
            }
        }
        return true
    }
    
    func sort2Arr(arr:[[Int64]], reverse:Bool)->[[Int64]]{
        if(arr.count == 0){
            return arr
        }
        var arr_temp = [[Int64]]()
        for item in arr{
            var item_temp = sortArr(item, reverse: true)
            arr_temp.append(item_temp)
        }
        for i in 0...arr_temp.count-1{
            if ((arr_temp.count-i-2) < 0) {
                break
            }
            for j in 0...arr_temp.count-i-2{
                let v1 = arr_temp[j]
                let v2 = arr_temp[j+1]
                if(reverse){
                    if( isLessArr(v1 , arr2:v2) ){
                        arr_temp[j] = v2
                        arr_temp[j+1] = v1
                    }
                }else{
                    if( !isLessArr(v1, arr2:v2) ){
                        arr_temp[j] = v2
                        arr_temp[j+1] = v1
                    }
                }
            }
        }
        return arr_temp
    }
    
    func isEqualArr(arr1:[Int64], arr2:[Int64])->Bool{
        if arr1.count != arr2.count{
            return false
        }
        sortArr(arr1, reverse: true)
        sortArr(arr2, reverse: true)
        for i in 0...arr1.count-1{
            if( arr1[i] != arr2[i] ){
                return false
            }
        }
        return true
    }
    
    func clean_arr(arr:[[Int64]])->[[Int64]]{
        if(arr.count == 0){
            return arr
        }
        
        var arr_temp = [[Int64]]()
        for item in arr{
            var item_temp = sortArr(item, reverse:true)
            arr_temp.append(item_temp)
        }
        
        for i in 0...arr_temp.count-1{
            if i >= arr_temp.count{
                break
            }
            if hasSameElement(arr_temp[i]){
                arr_temp.removeAtIndex(i)
            }
        }
        
        arr_temp = sort2Arr(arr_temp, reverse:true)
        
        if(arr_temp.count-2<0){
            return arr_temp
        }
        for i in 0...arr_temp.count-2{
            if i >= arr_temp.count-1{
                break
            }
            if( isEqualArr(arr_temp[i], arr2:arr_temp[i+1]) ){
                arr_temp.removeAtIndex(i)
            }
        }
        
        var arr_temp1 = sort2Arr(arr_temp, reverse:true)
        return arr_temp1
    }
    
    func getAllDN(num1:Int32, num2:Int32, n:Int32)->[[Int64]]{
        var arr = [[Int64]]()
        for x in 1...Int(num2/n + num1){
            if !isLess([Int64(num1),Int64(num2)], arr2: sumOfN(Int64(x), n: Int64(n))){
                break
            }
            if isLess([Int64(num1),Int64(num2)], arr2: [Int64(1),Int64(x)]){
                continue
            }
            else{
                var res = subRest(num1,n2:num2,num:Int32(x))
                if n==2{
                    if res[0] == 1{
                        var temp = [Int64]()
                        temp.append(Int64(x))
                        temp.append(res[1])
                        arr.append(temp)
                    }
                }
                else{
                    let n1 = res[0]
                    let n2 = res[1]
                    var arr_t = getAllDN(Int32(n1), num2:Int32(n2),n: n-1)
                    for item in arr_t{
                        var i_temp = item
                        i_temp.append(Int64(x))
                        arr.append(i_temp)
                    }
                }
            }
        }
        arr = clean_arr(arr)
        return arr
    }
    
    func subRest(n1:Int32, n2:Int32, num:Int32)->[Int64]{
        var num_1 = Int64(n1)*Int64(num) - Int64(n2)
        var num_2 = Int64(n2)*Int64(num)
        let gcdN = gcd(num_1, n2: num_2)
        
        return [num_1/gcdN, num_2/gcdN]
    }
    
    func getGoodDiv(arr:[[Int64]])->[Int64]{
        if arr.count == 0{
            return [Int64]()
        }
        var arr_temp = sort2Arr(arr, reverse: false)
        return sortArr(arr_temp[0], reverse: false)
    }
    
    func getGoodDivByCount(num1:Int32,num2:Int32)->[Int64]{
        var arr = [[Int64]]()
        var base_n = 2
        while arr.count == 0{
            if base_n >= MAX_LEN{
                return [Int64]()
            }
            arr = getAllDN(num1, num2: num2, n: Int32(base_n))
            if arr.count > 0{
                return getGoodDiv(arr)
            }
            base_n += 1
        }
        return [Int64]()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

