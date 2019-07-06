const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

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

const intervalSource$ = interval(500).pipe(take(5));
intervalSource$.subscribe(observerA);
setTimeout(() => intervalSource$.subscribe(observerB), 1000);
/**
콜드 옵저버블 예:
observerA: 0
observerA: 1
observerB: 0 // observerB는 옵저버블을 처음부터 다시 구독한다.
observerA: 2
observerB: 1
observerA: 3
observerB: 2
observerA: 4
observerA: complete
observerB: 3
observerB: 4
observerB: complete
 */