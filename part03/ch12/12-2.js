const { interval, Subject } = require('rxjs');
const { take, tap } = require('rxjs/operators');

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
const observerC = {
    next: x => console.log(`observerC: ${x}`),
    error: e => console.error(`observerC: ${e}`),
    complete: () => console.log('observerC: complete')
};

function createHotObservable(sourceObservable, subject) {
    return {
        connect: () => sourceObservable.subscribe(subject),
        subscribe: subject.subscribe.bind(subject)
    };
}
const sourceObservable$ = interval(500).pipe(
    take(5),
    tap(x => console.log(`tap ${x}`))
);
const hotObservableExample = createHotObservable(
    sourceObservable$,
    new Subject()
);

hotObservableExample.subscribe(observerA);
console.log('observerA subscribe');
hotObservableExample.subscribe(observerB);
console.log('observerB subscribe');

hotObservableExample.connect();
console.log('connect called');

setTimeout(() => {
    console.log('1000ms..');
    hotObservableExample.subscribe(observerC);
    console.log('observerC subscribe');
}, 1000);

/*
observerA subscribe
observerB subscribe
connect called
tap 0
observerA: 0
observerB: 0 // observerA, observerB는 시간 차이 없이 구독했으며
1000ms..
observerC subscribe // 1초 뒤에 observerC 가 구독했다.
tap 1
observerA: 1
observerB: 1
observerC: 1 // 1초 뒤에 구독한 observerC 가 A,B와 함께 작동하는것을 볼 수 있다.
tap 2
observerA: 2
observerB: 2
observerC: 2
tap 3
observerA: 3
observerB: 3
observerC: 3
tap 4
observerA: 4
observerB: 4
observerC: 4
observerA: complete
observerB: complete
observerC: complete
*/