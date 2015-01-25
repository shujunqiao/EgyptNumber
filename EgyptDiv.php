<?php

const MAX_LEN = 10;

function getAllDN($num1,$num2,$n){
	$arr = [];
	if ($num1 == 1) {
		$arr[] = [$num2];
	}
	else{
		for ($i=2; $i < (int)($num2/$n)+$num1; $i++) { 
			if( !isLess([$num1,$num2], sumOfN($i,$n)) )
				break;
			if ( isLess([$num1,$num2], [1,$i]) )
				continue;
			else{
				$res = subRest($num1,$num2,$i);
				if ($n == 2) {
					if ($res[0] == 1 && $res[1] > 0) {
						$arr[] = [$i, $res[1]];
					}
				}
				else{
					$arr_t = getAllDN($res[0], $res[1], $n-1);
					foreach ($arr_t as $item) { 
						$item[] = $i;
						$arr[] = $item;
					}
				}
			}
		}
	}
	$arr = clean_arr($arr);
	return $arr;
}

function clean_arr($arr){
	$arr_temp = [];
	foreach ($arr as $item) {
		rsort($item);
		$arr_temp[] = $item;
	}
	sort($arr_temp);
	foreach ($arr_temp as $key => $item) {
		if ($key >= count($arr_temp)-1) {
			break;
		}
		if($item == $arr_temp[$key+1]){
			unset($arr_temp[$key]);
		}
	}
	foreach ($arr_temp as $key => $item) {
		if ($key >= count($arr_temp)-1) {
			break;
		}
		if(haveSameElement($item)){
			unset($arr_temp[$key]);
		}
	}
	sort($arr_temp);
	return $arr_temp;
}

function haveSameElement($arr){
	sort($arr);
	foreach ($arr as $key => $value) {
		if ($key >= count($arr)-1) {
			break;
		}
		if ($value == $arr[$key+1]) {
			return true;
		}
	}
	return false;
}

function subRest($n1,$n2,$x){
	$num_1 = $n1*$x - $n2;
	$num_2 = $n2 * $x;
	$gcdN = gcd($num_1, $num_2);
	return [$num_1/$gcdN,$num_2/$gcdN];
}

function gcd($a,$b){
	while ($b != 0){
		$temp = $a % $b;
		$a = $b;
		$b = $temp;
	}
	return $a;
}

function sumOfN($x,$n){
	$n2 = $x;
	$n1 = 0;
	for ($i=1; $i < $n; $i++)
		$n2 *= ($i + $x);
	for ($i=0; $i < $n; $i++)
		$n1 += $n2/($i + $x);

	$gcdN = gcd($n1,$n2);
	return [$n1/$gcdN, $n2/$gcdN];
}

function getGoodDivByCount($num1,$num2){
	$arr = [];
	$base_n = 2;
	while (count($arr) == 0) {
		if ($base_n > MAX_LEN) {
			break;
		}
		$arr = getAllDN($num1,$num2,$base_n);
		if (count($arr) > 0) {
			$arr = clean_arr($arr);
			sort($arr[0]);
			return $arr[0];
		}
		$base_n ++;
	}
	return $arr;
}

function isLess($arr1,$arr2){
	return $arr1[0]*$arr2[1] <= $arr1[1]*$arr2[0];
}
print("*********** BEGIN ***********\n");
// $arr_res = getAllDN(19,45,3);
// print_r($arr_res);
print("*********** ARR_RES ***********\n");
// $arr_res = clean_arr($arr_res);
// print_r($arr_res);
$tBegin = time();
// $arr_res = getGoodDivByCount(67,101);
// $arr_res = getGoodDivByCount(998,999);
// $arr_res = getGoodDivByCount(907,911);
// $arr_res = getGoodDivByCount(523 , 547);
$arr_res = getGoodDivByCount(1107, 1151);
print_r($arr_res);
$tInterval = time() - $tBegin;
print("time:$tInterval\n");
print("*********** END ***********\n");