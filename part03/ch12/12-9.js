const { interval, Subject } = require('rxjs');
const { multicast, take, tap, publish } = require('rxjs/operators');

// const testSource$ = interval(500).pipe(
//     take(5),
//     tap(x => console.log(`tap ${x}`)),
//     multicast(() => new Subject())
// );
const testSource$ = interval(500).pipe(
    take(5),
    tap(x => console.log(`tap ${x}`)),
    publish()
);

const a = testSource$.subscribe(x => console.log(`a: ${x}`));
const b = testSource$.subscribe(x => console.log(`b: ${x}`));

testSource$.connect();

setTimeout(() => {
    console.log('timeout');
    a.unsubscribe();
    b.unsubscribe();
    // publish로 실행했을 경우, 서브젝트 구독이 완료되어서 더 이상 next 함수로 값을 전달해도 이를 수용하지 않음.
    testSource$.subscribe(x => console.log(`c: ${x}`)); 
    testSource$.connect();
}, 3000);

// 서브젝트 객체를 재구독할 때 발생할 수 있는 문제

/*
publish 로 실행했을 경우:
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
tap 0 // c: 가 출력되지 않는다.
tap 1
tap 2
tap 3
tap 4
*/