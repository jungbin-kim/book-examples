const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retryWhen, scan, catchError } = require('rxjs/operators');

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
                retryWhen(errors => { // 에러를 전달받아
                    return errors.pipe( // 특정 옵저버블을 반환. 이 경우에는 에러 발생을 누적해서 로그를 남기는 옵저버블.
                        scan(
                            (acc, error) => {
                                return {
                                    count: acc.count + 1,
                                    error
                                };
                            },
                            { count: 0 }
                        ),
                        tap(errorInfo =>
                            console.error(
                                `retryCount: ${
                                    errorInfo.count
                                }, error message: ${errorInfo.error.message}`
                            )
                        )
                    );
                }),
                catchError(err => of(err.message))
            );
        })
    )
    .subscribe(x => console.log(x), err => console.error(err));