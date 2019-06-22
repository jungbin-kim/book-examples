const { interval } = require('rxjs');
const { take, scan, pluck } = require('rxjs/operators');
const n = 7;

const source$ = interval(500).pipe(
    take(n),
    scan(
        (accumulation, currentValue) => {
            // currentValue로는 interval(500)에서 나오는 정수값이 들어온다. 0,1,2...
            const tempA = accumulation.a;
            accumulation.a = accumulation.b;
            accumulation.b = tempA + accumulation.b;
            return accumulation;
        },
        { a: 1, b: 0 }
    ),
    pluck('a')
);
// 시작부터 500ms 사이로 7번 돌아 3000ms 후에는 종료된다.
source$.subscribe(result => console.log(`result1 ${result}`));

// 시작으로 3100ms 후에 새로 구독 시작. 결과를 보면 이전 옵저버블의 값이 남아있어 이어져서 실행된다. 이 문제를 해결하는 코드는 5-21, 5-22
setTimeout(
    () =>
        source$.subscribe(result => console.log(`result2 ${result}`)),
    3100
);
