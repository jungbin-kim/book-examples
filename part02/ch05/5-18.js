const { range } = require('rxjs');
const { scan } = require('rxjs/operators');

range(0, 3)
    .pipe(
        scan((accumulation, currentValue) => {
            console.log(
                // 초기값 seed가 없으면 source에 가장 처음 값이 seed 값이 됨.
                // Optional. Default is undefined. If no seed value is specified, the first item of the source is used as the seed. 
                // from https://rxjs-dev.firebaseapp.com/api/operators/scan
                `accumulation ${accumulation}, currentValue ${currentValue}`
            );
            return accumulation + currentValue;
        })
    )
    .subscribe(result => console.log(`result ${result}`));
