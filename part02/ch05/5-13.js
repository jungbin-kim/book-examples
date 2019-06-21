const { range } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const fetch = require('node-fetch');
const colors = [
    'blue', 'red', 'black', 'yellow', 'green',
    'brown', 'gray', 'purple', 'gold', 'white'
];
const concurrent = 5;
const maxDelayInSecs = 6;
console.time('request_color');

range(0, colors.length)
    .pipe(
        mergeMap(colorIndex => {
            const currentDelay = parseInt(
                Math.random() * maxDelayInSecs,
                10
            );
            console.log(
                `[Request Color]: ${
                    colors[colorIndex]
                }, currentDelay: ${currentDelay}`
            );
            return fetch(
                `https://httpbin.org/delay/${currentDelay}?color_name=${
                    colors[colorIndex]
                }`
            ).then(res => res.json());
        }, concurrent) 
        // 예전에 간단한 스칼라 앱을 만들 때, Future.sequence 와 tail recursion 을 이용해서 요청을 나눠서 처리했던 적이 있다. 
        // Future.sequence 로 한번에 처리하고 싶은 만큼 (여기서 concurrent 변수와 비슷한 역할) 처리 후 tail recursion 으로 다음 스텝으로 넘어가는 형태였다.
        // 그 코드와 이 코드가 다른 점이 있다면, 그때는 동시에 보낸 요청들을 묶은 그룹인 Future.sequence 의 모든 응답이 온 뒤에야 다음 요청 그룹을 보냈지만, 여기서는 응답이 오면 바로 다음 요청 하나가 가는 구조이다.

        /** 첵 내용 중
         * 5개 요청을 모두 처리해야 나머지 5개를 요청하는 방식이 아니라 5개 중 요청 하나라도 먼저 처리하면 다음 처리할 것을 요청해서 항상 최대 5개 요청을 유지한다.
         * ...
         * 실무에서 대량의 네트워크 요청을 처리할 때는 네트워크 상태나 요청 값에 따라 응답 시간이 다를 수 있다. 이 때 요청 수 제한 없이 무작정 많은 연결을 한번에 만들면 효율이 낮다. 
         * 그렇다고 요청 하나의 처리를 완료하고 다음 요청을 처리하면 너무 느리다. 따라서 서버에서 한 번에 최대 어느 정도의 요청을 동시에 유지하면 효율이 높을지 측정한 후 적정선을 찾아야 한다.
        */
    )
    .subscribe(
        response =>
            console.log(
                `<Response> args: ${JSON.stringify(
                    response.args
                )}, url: ${response.url}`
            ),
        console.error,
        () => {
            console.log('complete');
            console.timeEnd('request_color');
        }
    );
