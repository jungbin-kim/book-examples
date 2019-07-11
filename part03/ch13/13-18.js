const { Observable, asyncScheduler } = require('rxjs')
const { observeOn } = require('rxjs/operators')

const source$ = Observable.create(observer => {
  console.log('BEGIN source')
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.complete()
  console.log('END source')
})

console.log('before subscribe')
// observeOn 연산자 다음으로 생성되는 옵저버블은 1초후 스케줄러를 이용해서 실행
// subscribe 함수 안에 있는 next 함수 동작이 스케줄러의 영향을 받아 1부터 3까지 출력만 1초 후 비동기로 처리
source$.pipe(observeOn(asyncScheduler, 1000)).subscribe(x => console.log(x))
console.log('after subscribe')
/*
before subscribe
BEGIN source
END source
after subscribe
1
2
3
*/
