const { concat, range } = require('rxjs');
const { tap } = require('rxjs/operators');
// 8-3 코드에서 tap에 들어가는 람다들이 프로퍼티가 붙은 형태다.
const observer1 = {
    next: x => console.log(`tap next: ${x} STREAM 1`),
    error: err => console.error(`tap ERROR: ${err} STREAM 1`),
    complete: () => console.log('complete STREAM 1')
};

const observer2 = {
    next: x => console.log(` tap next: ${x} STREAM 2`),
    error: err => console.error(` tap ERROR: ${err} STREAM 2`),
    complete: () => console.log(' complete STREAM 2')
};

concat(
    range(1, 4).pipe(tap(observer1)),
    range(5, 3).pipe(tap(observer2))
).subscribe(
    x => console.log(`   result ${x}`),
    err => console.error(`   subscribe ERROR: ${err}`),
    () => console.log('   subscribe complete')
);
