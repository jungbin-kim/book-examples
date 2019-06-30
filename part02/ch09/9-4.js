const { range } = require('rxjs');
const { find } = require('rxjs/operators');
const getRangeObservable = count => range(1, count);
function subscribeWithFindGreaterThan3(count) {
    getRangeObservable(count)
        .pipe(find(x => x > 3)) // find의 predicate를 만족하는 값이 오면 발행
        .subscribe(value =>
            console.log(
                `개수(count): ${count}, find조건: x > 3, 값(value): ${value}`
            )
        );
}
subscribeWithFindGreaterThan3(5);
subscribeWithFindGreaterThan3(1); // 찾을 수 없는 경우
