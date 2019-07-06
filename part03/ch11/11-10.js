const { Subject } = require('rxjs');

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

const subject = new Subject();
subject.complete();
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.next(1); // 무시된다.

/*
subject를 구독한 옵저버들은 complete 가 구독됨을 확인할 수 있다.
observerA: complete
observerB: complete
*/