/*
mergeMap은 project 함수가 배열이나 유사 배열을 검사(isArrayLike)하여 순회하면서 구독한다.
유사 배열을 구분하는 조건은 length 속성이 Number 타입인 객체
*/

const { isArrayLike } = require('rxjs/util/isArrayLike');

const { range } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

range(0, 3)
    .pipe(mergeMap(x => {
        const array = [x + 1, x + 2, x + 3, x + 4]
        console.log('isArrayLike(array) =', isArrayLike(array))
        return array
    })) // mergeMap이 배열을 반환
    .subscribe(value => console.log(`current value: ${value}`)); // 하지만, value가 배열을 반환하지는 않는다.
 // mergeMap을 사용하여 그 배열이 순회하면서 내부 item들이 하나씩 value에 나온다. 
