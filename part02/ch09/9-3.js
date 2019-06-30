const { range } = require('rxjs');
const { isEmpty } = require('rxjs/operators');
const getRangeObservable = count => range(1, count);
function subscribeWithIsEmpty(count) {
    getRangeObservable(count)
        .pipe(isEmpty()) // isEmpty를 판단한 값이 value로 된다.
        .subscribe(value =>
            console.log(`개수(count): ${count}, 값(value): ${value}`)
        );
}
subscribeWithIsEmpty(0);
subscribeWithIsEmpty(3);
