<h1 align="center">memoize</h1>
<h3 align="center">ES6 class method decorator for caching method calls</h3>
<p align="center">
  <a target="_blank" href="https://travis-ci.org/epegzz/memoize">
    <img alt="Travis" src="https://img.shields.io/travis/epegzz/memoize.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://codeclimate.com/github/epegzz/memoize/maintainability">
    <img alt="Maintainability" src="https://img.shields.io/codeclimate/maintainability/epegzz/memoize.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://codecov.io/gh/epegzz/memoize">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/epegzz/memoize.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@epegzz/memoize">
    <img alt="npm version" src="https://img.shields.io/npm/v/@epegzz/memoize.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@epegzz/memoize">
    <img alt="npm installs" src="https://img.shields.io/npm/dm/@epegzz/memoize.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://david-dm.org/epegzz/memoize">
    <img alt="dependencies" src="https://img.shields.io/david/epegzz/memoize.svg?style=flat-square">
  </a>
</p>


`memoize` as a little ES6 class method decorator that allows you to cache method calls.
If you call the method twice with the same function arguments, the second call will return the cached results:


```javascript
import memoize from '@epegzz/memoize'

class MemoizeDemo {

  @memoize
  doExpensiveCall() {
   console.log('Called with', JSON.stringify(arguments))
  }
  
  constructor () {
    this.doExpensiveCall('A') // prints `Called with ["A"]`
    this.doExpensiveCall('B') // prints `Called with ["B"]`
    this.doExpensiveCall('A') // no log output
    this.doExpensiveCall('A', 'C') // prints `Called with ["A", "C"]`
  }
}

```

Equality is checked for each argument using the `===` operator.

```javascript
  '1' === '1' // true
  'A' === 'A' // true
  'A' === 'B' // false
  ['A'] === ['A'] // false
  { 1: 2 } === { 1: 2 } // false
```


Also works with async methods:

```javascript
import memoize from '@epegzz/memoize'

class MemoizeDemo {

  @memoize
  async fetchWeather(cityName) {
    return fetch(`http://myweather.com/cities/${cityName}`)
  }

  constructor () {
    this.fetchWeather('Berlin').then(…)
    this.fetchWeather('Berlin').then(…) // no fetch was done here
  }
}

```


## Install

using npm
```sh
npm install @epegzz/memoize --save
```

using yarn
```sh
yarn add @epegzz/memoize
```

