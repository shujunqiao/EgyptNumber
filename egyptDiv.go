// #!/usr/bin/env go
package main

import (
	"fmt"
	"time"
)

func main() {
	var a int
	a = 13
	fmt.Printf("a = %d\n", a)

	// fmt.Println("isLess:", isLess([]int{2, 3}, []int{3, 4}))

	// fmt.Println("subRest:", subRest(2, 3, 2))

	// fmt.Println("gcd:", gcd(6, 3))

	// fmt.Println("getAllDN:", getAllDN(3, 4, 3))

	// var arr_res = getAllDN(19, 45, 3)
	// var arr_res1 = sortTwoArr(arr_res, false)
	// fmt.Println("getAllDN:", arr_res1)
	var t1 = time.Now()
	// var arr_res = getAllDN(907, 911, 6)
	// var arr_res = getAllDN(523, 547, 6)
	// var arr_res = getAllDN(19, 45, 3)
	// fmt.Println("arr_res:", arr_res)

	// var sum1 = sumOfN(1079, 2)
	// var bLess = isLess([]int{187, 994812}, sum1)
	// fmt.Println(sum1, bLess)

	// var arr = getGoodDivByCount(523, 547)
	// var arr = getGoodDivByCount(907, 911)
	// var arr = getGoodDivByCount(998, 999)
	var arr = getGoodDivByCount(1107, 1151)
	fmt.Println("907, 911:", arr)
	fmt.Println(time.Since(t1))
}

func isLess(tr1 []int, tr2 []int) bool {
	var l1 uint64 = uint64(tr1[0] * tr2[1])
	var l2 uint64 = uint64(tr1[1] * tr2[0])
	return l1 <= l2
}

func subRest(num1 int, num2 int, minN int) []int {
	var num_1 = num1*minN - num2
	var num_2 = num2 * minN
	var gcdN = gcd(num_1, num_2)
	return []int{num_1 / gcdN, num_2 / gcdN}
}

func gcd(num1 int, num2 int) int {
	if num1 < num2 {
		num1, num2 = num2, num1
	}
	for {
		var temp = num1 % num2
		num1 = num2
		num2 = temp
		if num2 == 0 {
			break
		}
	}
	return num1
}

func sumOfN(num int, n int) []int {
	var n2 = num
	var n1 = 0
	for i := 1; i < n; i++ {
		n2 *= i + num
	}
	for i := 0; i < n; i++ {
		n1 += n2 / (i + num)
	}
	var gcdN = gcd(n1, n2)
	return []int{n1 / gcdN, n2 / gcdN}
}

func sort(array []int, bReverse bool) []int {
	for i := 0; i < len(array); i++ {
		for j := 0; j < len(array)-i-1; j++ {
			if bReverse {
				if array[j] < array[j+1] {
					array[j], array[j+1] = array[j+1], array[j]
				}
			} else {
				if array[j] > array[j+1] {
					array[j], array[j+1] = array[j+1], array[j]
				}
			}
		}
	}
	return array
}

func sortTwoArr(arr [][]int, bReverse bool) [][]int {
	for i := 0; i < len(arr); i++ {
		for j := 0; j < len(arr)-i-1; j++ {
			if bReverse {
				if isArrLessTo(arr[j], arr[j+1]) {
					arr[j], arr[j+1] = arr[j+1], arr[j]
				}
			} else {
				var less = isArrLessTo(arr[j], arr[j+1])
				if !less {
					arr[j], arr[j+1] = arr[j+1], arr[j]
				}
			}
		}
	}
	return arr
}

func isEqualArr(arr1 []int, arr2 []int) bool {
	arr1 = sort(arr1, true)
	arr2 = sort(arr2, true)
	if len(arr1) != len(arr2) {
		return false
	}
	for i := 0; i < len(arr1); i++ {
		if arr1[i] != arr2[i] {
			return false
		}
	}
	return true
}

func isArrLessTo(arr1 []int, arr2 []int) bool {
	arr1 = sort(arr1, true)
	arr2 = sort(arr2, true)
	if len(arr1) > len(arr2) {
		return false
	} else if len(arr1) < len(arr2) {
		return true
	}
	for i := 0; i < len(arr1); i++ {
		if arr1[i] > arr2[i] {
			return false
		} else if arr1[i] < arr2[i] {
			return true
		}
	}
	return true
}

func countItem(arr [][]int, item []int) int {
	var count = 0
	for i := 0; i < len(arr); i++ {
		if isEqualArr(arr[i], item) {
			count++
		}
	}
	return count
}

func hasSameElement(arr []int) bool {
	for i := 0; i < len(arr)-1; i++ {
		if arr[i] == arr[i+1] {
			return true
		}
	}
	return false
}

func Remove(slice [][]int, start, end int) [][]int {
	if start > len(slice) {
		return slice
	}
	var slice_temp = slice[:start]
	if end < len(slice) {
		for _, item := range slice[end:] {
			slice_temp = append(slice_temp, item)
		}
	}
	return slice_temp
}

func clear_arr(arr [][]int) [][]int {
	for _, item := range arr {
		item = sort(item, true)
	}
	for {
		var count = 0
		for idx, item := range arr {
			if hasSameElement(item) {
				arr = Remove(arr, idx, idx+1)
				count++
			}
		}
		if count == 0 {
			break
		}
	}
	for {
		var count = 0
		for idx, item := range arr {
			if countItem(arr, item) > 1 {
				arr = Remove(arr, idx, idx+1)
				count++
			}
		}
		if count == 0 {
			break
		}
	}

	return arr
}

func getAllDN(num1 int, num2 int, n int) [][]int {
	var arr [][]int = make([][]int, 0)
	for i := 1; i < int(num2/n)+num1; i++ {
		if !isLess([]int{num1, num2}, sumOfN(i, n)) {
			break
		}
		if isLess([]int{num1, num2}, []int{1, i}) {
			continue
		} else {
			var res = subRest(num1, num2, i)
			if n == 2 {
				if res[0] == 1 {
					arr = append(arr, []int{i, res[1]})
				}
			} else {
				var arr_t = getAllDN(res[0], res[1], n-1)
				for _, item := range arr_t {
					item = append(item, i)
					arr = append(arr, item)
				}
			}
		}
	}

	var arr_temp = clear_arr(arr)
	return arr_temp
}

func getGoodDivByCount(num1 int, num2 int) []int {
	var arr = make([][]int, 0)
	var base_n = 2
	for {
		arr = getAllDN(num1, num2, base_n)
		if len(arr) > 0 {
			arr = clear_arr(arr)
			var arr_temp = sortTwoArr(arr, false)
			return sort(arr_temp[0], false)
		}
		base_n++
	}
	return arr[0]
}

func sumOfArr(arr []int) (num1, num2 int) {
	var n1 = 1
	var n2 = 0
	for _, item := range arr {
		n1 *= item
	}
	for _, item := range arr {
		n2 += n1 / item
	}
	var gcdN = gcd(n2, n1)

	return n2 / gcdN, n1 / gcdN
}
