const { interval, Subject } = require('rxjs');
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
// 구독이 완료되고 어떻게 되는지 관찰하기 위해서 observerC 추가
const observerC = {
    next: x => console.log(`observerC: ${x}`),
    error: e => console.error(`observerC: ${e}`),
    complete: () => console.log('observerC: complete')
};

const subject = new Subject();
subject.subscribe(observerA);
intervalSource$.subscribe({
    next: x => subject.next(x),
    error: e => subject.error(e),
    complete: () => subject.complete()
});
setTimeout(() => subject.subscribe(observerB), 2000);
// 6초 후에 observerC가 subject를 구독한다.
setTimeout(() => subject.subscribe(observerC), 6000);

/*
subject를 이용해서 기존 옵저버가 멀티 캐스팅되는 구조:
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerB: 3
observerA: 4
observerB: 4
observerA: complete
observerB: complete
observerC: complete // 6초 후에 나타난다.
*/