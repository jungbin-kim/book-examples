const { range } = require('rxjs');
const { defaultIfEmpty } = require('rxjs/operators');
const getRangeObservable = count => range(1, count);
function subscribeWithDefaultIfEmpty(count) {
    getRangeObservable(count)
        .pipe(defaultIfEmpty('EMPTY')) // 빈 옵저버블일 경우 default 값 설정. 계속 흘러감.
        .subscribe(value =>
            console.log(`개수(count): ${count}, 값(value): ${value}`)
        );
}
subscribeWithDefaultIfEmpty(0);
subscribeWithDefaultIfEmpty(3);