const { range } = require('rxjs');
const { reduce, tap } = require('rxjs/operators');

range(1, 4)
    .pipe(
        reduce((acc, curr) => {
            console.log(`acc: ${acc}, curr: ${curr}`)
            return acc + curr
        }),
        // reduce가 모두 실행된 뒤에 넘어온다.
        tap(x => console.log(x)) 
    )
    .subscribe(x => console.log(x));
/*
실행 결과:    
acc: 1, curr: 2 // 누적자에 초깃값인 1이 들어간다.
acc: 3, curr: 3 // acc는 이전 값의 합인 1 + 2 = 3 이 들어온다.
acc: 6, curr: 4
10
10
*/