const { BehaviorSubject } = require('rxjs');

const behaviorSubject = new BehaviorSubject('초기값');
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
behaviorSubject.subscribe(observerA);
behaviorSubject.next('값1');
behaviorSubject.subscribe(observerB);
behaviorSubject.next('값2');
behaviorSubject.subscribe(observerC);
behaviorSubject.next('값3');
behaviorSubject.next('값4');
behaviorSubject.next('값5');

/*
observerA: 초기값 // 처음 구독했을 때 초깃값을 받는다.
observerA: 값1
observerB: 값1 // observerB가 구독할 때의 초깃값은 값1 이다.
observerA: 값2
observerB: 값2
observerC: 값2
observerA: 값3
observerB: 값3
observerC: 값3
observerA: 값4
observerB: 값4
observerC: 값4
observerA: 값5
observerB: 값5
observerC: 값5
*/