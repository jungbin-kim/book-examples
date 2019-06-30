const { from } = require('rxjs');
const { tap, catchError } = require('rxjs/operators');

const integers = [1, 2, 3, 'r', 5];
const integersIfError = [4, 6];
from(integers)
    .pipe(
        tap(x => {
            if(!Number.isInteger(x)) {
                throw new TypeError(`${x}은(는) 정수가 아닙니다`)
            }
        }),
        catchError(err => {
            // console.log(err) // 주석을 풀면 에러 메시지가 로그로 남는다.
            // 에러를 명시적으로 리턴하지 않으면 에러가 발행되지 않으며, 아래 리턴되는 옵저버블이 구독된다.
            return from(integersIfError);
        })
    )
    .subscribe(x => console.log(x), err => console.error(err));
/*
실행 결과:
1
2
3
4
6
*/
