const { interval, Subject } = require('rxjs');
const { take, tap, multicast, publish, refCount } = require('rxjs/operators');

// const testSource$ = interval(500).pipe(
//     take(5),
//     tap(x => console.log(`tap ${x}`)),
//     multicast(() => new Subject()),
//     refCount()
// );
const testSource$ = interval(500).pipe(
    take(5),
    tap(x => console.log(`tap ${x}`)),
    publish(),
    refCount()
);

const a = testSource$.subscribe(x => console.log(`a: ${x}`));
const b = testSource$.subscribe(x => console.log(`b: ${x}`));
// testSource$.connect(); 가 생략될 수 있다.

setTimeout(() => {
    console.log('timeout');
    testSource$.subscribe(x => console.log(`c: ${x}`));
    // publish로 할 경우 connect 함수 자체를 호출 하지 않음.
}, 3000);
