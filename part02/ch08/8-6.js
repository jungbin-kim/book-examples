const { range } = require('rxjs');
const { finalize, map } = require('rxjs/operators');

const source$ = range(1, 3)
    .pipe(finalize(() => console.log('FINALLY CALLBACK')))

// 모든 발행이 정상적으로 끝났을 때, finalize 실행 관측
source$.subscribe(
    x => console.log(x),
    err => console.error(err),
    () => console.log('COMPLETE')
);

// 발행 중 에러 발생시, finalize 실행 관측
source$.pipe(
    map(x => (x === 2 ? x.test() : x )) // x = 2 일 때 에러를 발생 시켰다.
).subscribe(
    x => console.log(x),
    err => console.error(err),
    () => console.log('COMPLETE')
);
/*
실행 결과:
1
2
3
COMPLETE
FINALLY CALLBACK
1
TypeError: x.test is not a function
... 에러 메시지 생략 ...
FINALLY CALLBACK
*/