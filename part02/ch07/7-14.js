const { range  } = require('rxjs');
const { count,tap } = require('rxjs/operators');

range(1, 7)
    .pipe(
        tap(x => console.log(x)), // 1번 tap
        count(x => x % 2 === 0),
        tap(x => console.log(x))  // 2번 tap
    )
    .subscribe(x => console.log(x));
/*
실행 결과: 
1
2
3
4
5
6
7 // 여기까지가 1번 tap
3 // 2번 tap
3 // subscribe
*/