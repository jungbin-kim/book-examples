const { Observable, asyncScheduler } = require('rxjs')
const { subscribeOn } = require('rxjs/operators')

// 스케줄러에 영향을 받는다.
const source$ = Observable.create(observer => {
  console.log('BEGIN source')
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.complete()
  console.log('END source')
})

console.log('before subscribe')
source$.pipe(subscribeOn(asyncScheduler, 1000)).subscribe(x => console.log(x)) // 소스의 옵저버블 작업을 subscribeOn 에서 지정한 스케줄러로 실행. 1초 뒤에 구독됨
console.log('after subscribe')
/*
before subscribe
after subscribe 
BEGIN source // 1초 후
1
2
3
END source
*/
