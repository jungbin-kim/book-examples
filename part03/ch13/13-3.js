const { asyncScheduler } = require('rxjs')
asyncScheduler.schedule(function work(value) {
  value = value || 0
  console.log('value: ' + value)
  const selfAction = this
  selfAction.schedule(value + 1, 1000) // 자기 자신을 schedule로 재귀 호출
  // delay 값이 1000으로 같아서 setInterval 값이 1초로 지정되어 매회 해당 동작을 실행.
  // 만약 delay 값이 다르다면, clearInterval 함수로 초기화하여 새로 setInterval을 호출.
}, 1000)
