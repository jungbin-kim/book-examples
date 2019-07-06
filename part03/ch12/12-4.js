const { interval, Subject } = require('rxjs');
const { take, multicast } = require('rxjs/operators');
const subject = new Subject();
const sourceObservable$ = interval(500).pipe(take(5));
const multi = sourceObservable$.pipe(multicast(() => subject));
// 아래 코드를 사용해도 괜찮음
// const multi = sourceObservable$.pipe(multicast(subject));

const subscriberOne = multi.subscribe(val => console.log(val));
const subscriberTwo = multi.subscribe(val => console.log(val));

subject.next(500);

setTimeout(() => {
  console.log('1000ms..');
  multi.connect();
}, 1000);

setTimeout(() => {
  console.log('2500ms..');
  subject.next(100);
}, 2500);

/*
소스 옵저버블이 발행하는 값이 호출되는 것이 아니라, 서브젝트에서 넘겨준 값이 구독되는 것을 볼 수 있다.
500
500
1000ms..
0
0
1
1
2500ms..
100
100
2
2
3
3
4
4
*/