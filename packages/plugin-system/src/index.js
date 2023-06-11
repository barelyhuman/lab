function hook(k, h, lmap) {
  const ls = lmap.get(k) || []
  ls.push({ h })
  lmap.set(k, ls)
}

function call(k, d, lmap) {
  const ls = lmap.get(k) || []
  for (let i of ls) {
    i.h(d)
  }
}

export function createHook() {
  const l = new Map()
  return {
    hook(k, h) {
      hook(k, h, l)
    },
    call(k, d) {
      call(k, d, l)
    },
  }
}
