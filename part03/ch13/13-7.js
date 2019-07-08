const { of, asapScheduler } = require('rxjs')
console.log('start')
of(1, 2, 3, asapScheduler).subscribe(x => console.log(x))
console.log(`actions length: : ${asapScheduler.actions.length}`)
console.log('end')

/*
start
actions length: : 1
end
1
2
3
*/

/* 
asapScheduler로 실행하지 않을 경우:
start
1
2
3
end
*/
