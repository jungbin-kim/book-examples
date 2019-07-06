const { ReplaySubject, interval } = require('rxjs');
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

const replaySubject = new ReplaySubject(3);
const intervalSource$ = interval(500).pipe(take(8));

console.log("try replaySubject.subscribe(observerA)");
replaySubject.subscribe(observerA);

console.log("try intervalSource$.subscribe(replaySubject)");
intervalSource$.subscribe(replaySubject);

setTimeout(() => {
    console.log("try replaySubject.subscribe(observerB), setTimeout 2600ms");
    replaySubject.subscribe(observerB);
}, 2600);

/*
try replaySubject.subscribe(observerA)
try intervalSource$.subscribe(replaySubject)
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerA: 4
try replaySubject.subscribe(observerB), setTimeout 2600ms
observerB: 2 // observerB가 구독할 때 최근 3개(2,3,4)까지를 보낸다,
observerB: 3
observerB: 4
observerA: 5
observerB: 5
observerA: 6
observerB: 6
observerA: 7
observerB: 7
observerA: complete
observerB: complete
*/