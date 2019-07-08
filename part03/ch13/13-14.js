const { queueScheduler } = require('rxjs')
const n = 6
queueScheduler.schedule(
  function(state) {
    console.log(`finbonicci[${state.index}]: ${state.a}`)
    if (state.index < n) {
      // 재귀를 할 조건
      this.schedule({
        index: state.index + 1,
        a: state.b,
        b: state.a + state.b
      })
    }
  },
  null, // Delay. null일 경우, AsyncScheduler 상속받아 동작
  { index: 0, a: 0, b: 1 } // 초기 상태값
)
