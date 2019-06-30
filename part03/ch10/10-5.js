const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retryWhen, scan, catchError } = require('rxjs/operators');
interval(100)
    .pipe(
        take(30),
        mergeMap(x => {
            return of(x).pipe(
                tap(value => {
                    if (Math.random() <= 0.5) {
                        throw new Error(`RANDOM ERROR ${value}`);
                    }
                }),
                retryWhen(errors => {
                    return errors.pipe(
                        take(2), // take를 이용해서 원하는 재시도 횟수를 지정. retryWhen의 notifier에서 리턴하는 옵저버블이 값을 두번만 발행하도록 해줌.
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