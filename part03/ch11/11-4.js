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
const observerC = {
    next: x => console.log(`observerC: ${x}`),
    error: e => console.error(`observerC: ${e}`),
    complete: () => console.log('observerC: complete')
};

subject.subscribe(observerA);
subject.subscribe(observerB);
subject.subscribe(observerC);

subject.complete(); // complete가 호출된 시점 이후로도 값을 전파하지 않는다.
subject.next(4);
subject.error(new Error('error!'));
/*
observerA: complete
observerB: complete
observerC: complete
*/