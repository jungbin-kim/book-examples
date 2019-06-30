const { interval } = require('rxjs');
const { take, tap } = require('rxjs/operators');

const successX = x => console.log(`tap1 - interval do ${x}`)
const errorX = x => console.log(`tap2 - interval do ${x < 3 ? x : x.test()}`)

const source$ = interval(100)
    .pipe(
        take(10)
    )

// 에러 발생 없이 진행
source$.pipe(
    tap(successX)
)
.toPromise()
.then(
    value => console.log(`프로미스 결과 ${value}`),
    reason => console.error(`프로미스 에러 ${reason}`)
);
// toPromise 함수의 reject 에러 처리
source$.pipe(
    tap(errorX)
)
.toPromise()
.then(
    value => console.log(`프로미스 결과 ${value}`),
    reason => console.error(`프로미스 에러 ${reason}`)
);

/*
tap 1, 2가 호출되다가, 
tap2가 3이되면서 에러가 발생하고, tap2는 promise reject을 호출하며 종료. 
tap1은 마지막 9에서 resovle 호출.
실행 결과:
tap1 - interval do 0
tap2 - interval do 0
tap1 - interval do 1
tap2 - interval do 1
tap1 - interval do 2
tap2 - interval do 2
tap1 - interval do 3
프로미스 에러 TypeError: x.test is not a function
tap1 - interval do 4
tap1 - interval do 5
tap1 - interval do 6
tap1 - interval do 7
tap1 - interval do 8
tap1 - interval do 9
프로미스 결과 9
*/