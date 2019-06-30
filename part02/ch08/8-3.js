const { concat, range } = require('rxjs');
const { map, tap } = require('rxjs/operators');

concat(
    range(1, 4).pipe(
        tap(
            x => console.log(`tap next: ${x} STREAM 1`),
            err => console.error(`tap ERROR: ${err} STREAM 1`),
            () => console.log('complete STREAM 1') // STREAM 1이 종료되면 호출
        )
    ),
    range(5, 3).pipe(
        map(x => (x === 7 ? x.test() : x + 1)), // x => 5,6,7 마지막 순서(7)에 에러를 발생 시켰다.
        tap(
            x => console.log(`tap next: ${x} STREAM 2`),
            err => console.error(`tap ERROR: ${err} STREAM 2`),
            () => console.log('complete STREAM 2')
        )
    )
).subscribe(
    x => console.log(`   result ${x}`),
    err => console.error(`   subscribe ERROR: ${err}`),
    () => console.log('   subscribe complete')
);
/*
실행결과:
tap next: 1 STREAM 1
   result 1
tap next: 2 STREAM 1
   result 2
tap next: 3 STREAM 1
   result 3
tap next: 4 STREAM 1
   result 4
complete STREAM 1
tap next: 6 STREAM 2
   result 6
tap next: 7 STREAM 2
   result 7
tap ERROR: TypeError: x.test is not a function STREAM 2
   subscribe ERROR: TypeError: x.test is not a function
*/