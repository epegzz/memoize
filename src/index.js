function populate (func, funcArgs = [], thisArg) {
  func._cache = {
    id: Symbol('id'),
    args: funcArgs,
    isInProgress: true,
    time: new Date()
  }

  const value = func.apply(thisArg, funcArgs)
  if (value && value.then) {
    func._cache.value = value.finally(() => {
      func._cache.isInProgress = false
    })
  } else {
    func._cache.isInProgress = false
    func._cache.value = value
  }
}

function read (func) {
  return func._cache && func._cache.value
}

function isValid (func, funcArgs = []) {
  if (!func._cache || !func._cache.args) return false
  if (funcArgs.length === 0 && func._cache.args.length === 0) return true
  return func._cache.args.reduce(
    (result, arg, index) => result && arg === funcArgs[index],
    true
  )
}

function isInProgress (func) {
  return func._cache && func._cache.isInProgress
}

export function cache (func, funcArgs = [], thisArg, funcName) {
  if (!isValid(func, funcArgs) && !isInProgress(func)) {
    populate(func, funcArgs, thisArg)
  }
  return read(func)
}

export default function memoized (target, funcName, descriptor) {
  const func = descriptor.value
  descriptor.value = function (...funcArgs) {
    return cache(func, funcArgs, this, funcName)
  }
  return descriptor
}
