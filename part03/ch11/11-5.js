const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

const intervalSource$ = interval(500).pipe(take(5));

const observerA = {
    next: x => console.log(`observerA: ${x}`),
    error: e => console.error(`observerA: ${e}`),
    complete: () => console.log('observerA: complete')
};

const observerB = {
    next: x => console.log(`observerB: ${x}`),
    error: e => console.error(`observerB: ${e}`),
    complete: () => console.log('observerB: complete')
};

intervalSource$.subscribe(observerA);
setTimeout(() => intervalSource$.subscribe(observerB), 2000); // 2초 뒤에 observerB 가 intervalSource$ 구독
/*
interval 생성 함수를 이용한 콜드 옵저버블 동작:
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerB: 0 // observerB 가 intervalSource$의 처음부터 구독된다.
observerA: 4
observerA: complete
observerB: 1
observerB: 2
observerB: 3
observerB: 4
observerB: complete
*/
