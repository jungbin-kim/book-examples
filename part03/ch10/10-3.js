const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retry, catchError } = require('rxjs/operators');
interval(100)
    .pipe(
        take(30),
        mergeMap(x => {
            return of(x).pipe(
                tap(value => {
                    if (Math.random() <= 0.3) {
                        throw new Error(`RANDOM ERROR ${value}`);
                    }
                }),
                retry(1), // retry횟수와 유무에 따라 에러를 방지 할 수 있음. 1일 경우 한번 retry하고 성공일 경우 catchError로 가지 않는다.
                catchError(err => of(err.message))
            );
        })
    )
    .subscribe(x => console.log(x), err => console.error(err));
