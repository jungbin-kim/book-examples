const { interval } = require('rxjs');
const { take, tap, publish, refCount, share } = require('rxjs/operators');

const testSource$ = interval(500).pipe(
    take(5),
    tap(x => console.log(`tap ${x}`)),
    share()
);
// const testSource$ = interval(500).pipe(
//     take(5),
//     tap(x => console.log(`tap ${x}`)),
//     publish(),
//     refCount()
// );

const a = testSource$.subscribe(x => console.log(`a: ${x}`));
const b = testSource$.subscribe(x => console.log(`b: ${x}`));

setTimeout(() => {
    console.log('timeout');
    testSource$.subscribe(x => console.log(`c: ${x}`));
    // share() 사용할 경우, 새롭게 옵저버블이 구독된다. 
    // publish(), refCount() 조합 사용할 경우, 더이상 구독되지 않는다.
}, 3000);

/*
share() 사용할 경우:
tap 0
a: 0
b: 0
tap 1
a: 1
b: 1
tap 2
a: 2
b: 2
tap 3
a: 3
b: 3
tap 4
a: 4
b: 4
timeout
tap 0
c: 0
tap 1
c: 1
tap 2
c: 2
tap 3
c: 3
tap 4
c: 4
*/

/*
publish(), refCount() 조합 사용할 경우:
tap 0
a: 0
b: 0
tap 1
a: 1
b: 1
tap 2
a: 2
b: 2
tap 3
a: 3
b: 3
tap 4
a: 4
b: 4
timeout
*/