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
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.next(1); // unsubscribe 전, 구독하고 있는 observerA, observerB는 정상 구독하다가
subject.unsubscribe(); // 서브젝트를 unsubscribe 하면 이후 모든 옵저버를 대상으로 멀티캐스팅할 수 없다.
// 각각 하나씩만 남기고, 나머지 주석처리 해보세요.
subject.subscribe(observerC);
// subject.next(1);
// subject.error('error');
// subject.complete();
