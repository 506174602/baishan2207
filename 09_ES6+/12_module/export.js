
// export 输出变量 或者 函数
export const a = 10
export let b = 30

let c = 40
export {c}

let d = 50
export { d as dog }

export function m(x = 1, y = 1) {
    return x + y
}

function f() {
    console.log('f被调用')
}
function g() {
    console.log('g被调用')
}
export {f, g}