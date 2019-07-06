const { interval, AsyncSubject } = require('rxjs');
const { take, scan, pluck, tap } = require('rxjs/operators');
const period = 500;
const fibonacci = n => interval(period).pipe(
    take(n),
    scan((acc, index) => acc ? {
      a: acc.b,
      b: acc.a + acc.b
	  } : {a: 0, b: 1}, null),
	  pluck('a'),
    tap(n => console.log(`tap log: emitting ${n}`))
  );

const lastN = 8;
const asyncSubject = new AsyncSubject();
fibonacci(lastN).subscribe(asyncSubject);

asyncSubject.subscribe(result => console.log(`1st subscribe: ${result}`));
setTimeout(() => {
   console.log("try 2nd subscribe");
   asyncSubject.subscribe(result => console.log(`2nd subscribe: ${result}`));
}, period * lastN);

// source 옵저버블이 빌헹을 끝내기 전에 3번째 subscribe를 해보았다.
setTimeout(() => {
  console.log("try 3th subscribe");
  asyncSubject.subscribe(result => console.log(`3th subscribe: ${result}`));
}, 2000);

// source 옵저버블이 빌헹이 끝난 후 4번째 subscribe를 해보았다.
setTimeout(() => {
  console.log("try 4th subscribe");
  asyncSubject.subscribe(result => console.log(`4th subscribe: ${result}`));
}, 6000);

/*
tap log: emitting 0
tap log: emitting 1
tap log: emitting 1
try 3th subscribe // 중간(2초)에 3th subscribe
tap log: emitting 2
tap log: emitting 3
tap log: emitting 5
tap log: emitting 8
try 2nd subscribe
tap log: emitting 13
1st subscribe: 13
3th subscribe: 13
2nd subscribe: 13
try 4th subscribe // 6초 후 4th subscribe
4th subscribe: 13 // 마지막 값 전달 받음.
*/