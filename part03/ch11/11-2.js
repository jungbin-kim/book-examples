const { Subject } = require('rxjs');
// 서브젝트 생성
const subject = new Subject();
// 관찰자 A,B,C를 선언
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
// 서브젝트를 관찰자들이 구독한다. => 서브젝트의 어떤 변경 사항이 있는지 옵저버가 받아서 정해진 로직을 수행한다.
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.subscribe(observerC);

subject.next(1);
subject.next(2);
subject.next(3);