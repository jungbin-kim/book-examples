const { interval, Subject } = require('rxjs');
const { take, multicast } = require('rxjs/operators');
const sourceObservable$ = interval(500).pipe(take(4));
const multi = sourceObservable$.pipe(multicast(() => new Subject()));

// 첫 번째 인자로 제공한 팩토리 함수에서 리턴한 서브젝트를 구독하는 부분 
const subscriberOne = multi.subscribe(val => console.log(val));
const subscriberTwo = multi.subscribe(val => console.log(val));

setTimeout(() => {
  console.log('1000ms..');
  multi.subscribe(val => console.log(val));
}, 1000);

// 소스 옵저버블이 서브젝트를 구독하는 부분
multi.connect();

/*
정상적으로 소스 옵저버블을 구독한다.
0
0
1000ms.. 
1
1
1
2
2
2
3
3
3
*/