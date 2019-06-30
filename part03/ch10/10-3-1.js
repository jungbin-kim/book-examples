const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retry, catchError } = require('rxjs/operators');
// 코드 10-3에서 mergeMap을 뺄 경우 테스트
interval(100)
    .pipe(
        take(30),
        tap(value => {
            if (Math.random() <= 0.3) {
                throw new Error(`RANDOM ERROR ${value}`);
            }
        }),
        retry(1) // retry가 발생할 경우 소스 옵저버블을 새로 구독함으로 0부터 다시 호출된다.
    )
    .subscribe(x => console.log(x), err => console.error('test', err));
/*
실행결과(랜덤주의):
0
1
2
3
0 // <-- 여기서 retry 1 하고 성공
test Error: RANDOM ERROR 1 // <-- retry 1까지 실패
*/