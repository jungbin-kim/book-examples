const { range } = require('rxjs');
const { reduce } = require('rxjs/operators');

range(2, 4)
    .pipe(reduce((acc, curr, index) => {
        const nextAcc = acc + curr
        console.log(`acc: ${acc}, curr: ${curr}, next acc: ${nextAcc}, index: ${index}`)
        return nextAcc
    }, 1))
    .subscribe(x => console.log(x));

/**
실행 결과:
acc: 1, curr: 2, next acc: 3, index: 0
acc: 3, curr: 3, next acc: 6, index: 1
acc: 6, curr: 4, next acc: 10, index: 2
acc: 10, curr: 5, next acc: 15, index: 3
15
 */