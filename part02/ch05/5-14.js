const { interval } = require('rxjs');
const { take, switchMap, map, mergeMap } = require('rxjs/operators');

const source$ = interval(600).pipe(take(5)) // source는 600ms 마다 1씩 증가하는 것을 5개까지 발행: 0,1,2,3,4
const mapProcess$ = x => interval(250).pipe( // x 값을 받아서 250ms 마다 1씩 증가하는 y를 3개까지 발행: {x, 0}, {x, 1}, {x, 2}
        map(y => ({ x, y })),
        take(3)
    )


// 책 내용: switchMap 연산자는 project함수에서 새 옵저버블을 리턴해 구독하기 전 기존 연산자로 구독하여 완료되지 않은 옵저버블이 있다면 해당 옵저버블의구독을 해제하고 새 옵저버블을 구독.
const switchMapTest$ = source$.pipe(
    switchMap(mapProcess$) // switchMap 으로 처리할 경우, x의 interval 600ms 내에 y는 2개 발행이 될 수 있다. y값의 발행에 따라서 x의 값의 제한된다.
)

// 책 내용: mergeMap 연산자는 project 함수에서 리턴한 옵저버블을 구독하는 중 소스 옵저버블에서 발행한 값이 있다면 새로 구독하는 옵저버블을 구독한다. 이때 구독하던 옵저버블과 새로 구독하는 옵저버블 모두 함께 동작
const mergeMapTest$ = source$.pipe(
    mergeMap(mapProcess$) // 결과값을 보면 source$와 mapProcess$ 내 두 Observable이 함께 동작하고(각각 따로 구독되고) 있는 것을 볼 수 있다. 
)

switchMapTest$.subscribe(result => console.log(`next x: ${result.x}, y: ${result.y}`));

// 원래 소스
// interval(600)
//     .pipe(
//         take(5),
//         switchMap(x =>
//             interval(250).pipe(
//                 map(y => ({ x, y })),
//                 take(3)
//             )
//         )
//     )
//     .subscribe(result => console.log(`next x: ${result.x}, y: ${result.y}`));
