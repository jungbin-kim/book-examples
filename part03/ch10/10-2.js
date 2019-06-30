const { from, of } = require('rxjs');
const { mergeMap, tap, catchError } = require('rxjs/operators');
from(['1', '2', '3', 'r', '5', '6', 'u', '8'])
    .pipe(
        mergeMap(x => {
            return of(x).pipe( // 소스 옵저버블 값을 그대로 리턴하는 새로운 소스 옵저버블
                tap(value => {
                    if (!Number.isInteger(parseInt(value, 10))) {
                        throw new TypeError(`${value}은(는) 정수가 아닙니다`);
                    }
                }),
                catchError(err => of(err.message)) // 새로운 소스 옵저버블에서 에러일 경우 에러 메시지를 발행하고 종료된다.
            );
        })
    )
    .subscribe(x => console.log(x), err => console.error(err));
    // mergeMap으로 새로운 소스 옵저버블 값이 구독되기 때문에 처음 소스 옵저버블은 계속해서 발행된다.
/*
실행 결과:
1
2
3
r은(는) 정수가 아닙니다
5
6
u은(는) 정수가 아닙니다
8
*/