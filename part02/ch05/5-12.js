
/*
5-9.js 와 비슷.
mergeMap은 project 함수가 iterable 객체인지 검사(isIterable)하여 이터러블에서 이터레이터를 가져와서 next 함수를 호출해 구독.
*/
const { isArrayLike } = require('rxjs/util/isArrayLike');
const { isIterable } = require('rxjs/util/isIterable');

const { range } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

range(0, 3)
    .pipe(
        mergeMap(x => {
            const nextMap = new Map();
            nextMap.set('original', x);
            nextMap.set('plusOne', x + 1);
            console.log(`isArrayLike(nextMap)=${isArrayLike(nextMap)}, isIterable(nextMap)=${isIterable(nextMap)}`)
            return nextMap;
        })
    )
    .subscribe(entry => {
        const [key, value] = entry;
        console.log(`key is ${key}, value is ${value}`);
    });
