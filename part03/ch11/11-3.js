const { Subject } = require('rxjs');
const subject = new Subject();
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
// 코드 11-11와 비슷
const observerC = {
    next: x => console.log(`observerC: ${x}`),
    error: e => console.error(`observerC: ${e}`),
    complete: () => console.log('observerC: complete')
};

subject.subscribe(observerA);
subject.subscribe(observerB);
subject.subscribe(observerC);

subject.error(new Error('error!')); // 에러가 발생한 시점 이후로는 옵저버들이 구독되지 않는다.
subject.next(4);
subject.complete();
/*
observerA: Error: error!
observerB: Error: error!
observerC: Error: error!
*/