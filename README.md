# lambda-calculus.js

Parser and Solver of Lambda Calculus

## Downloads

- [lambda-calculus.js](https://raw.githubusercontent.com/atmarksharp/lambda-calculus-js/master/lambda-calculus.js)
- [lambda-calculus.min.js](https://raw.githubusercontent.com/atmarksharp/lambda-calculus-js/master/lambda-calculus.min.js)

(Right-click a link, and select "Save As")

## License

MIT License

## Usage

#### Preference

- Add **&lt;script>**path/to/lambda.js**&lt;/script>** into *&lt;head>...&lt;/head>*

#### Basic Usage

```javascript
var e = lambda('(λx.x) a'); // this is simplest, and easy to understand.
console.log(e.solve().str()); // a

e = L('(λx.x) a'); // L() is shorthand for lambda().
console.log(e.solve().str()); // a

e = L('(#x.x) a'); // '#' is alias of 'λ'
console.log(e.solve().str()); // a
```

#### Practical Usage

```javascript
var e = L('ADD 2 3',{
  'ADD':'(λmnfx.mf(nfx))',
  '2':'(λfx.f(fx))',
  '3':'(λfx.f(f(fx)))',
  '5':'(λfx.f(f(f(f(fx)))))'
});

var solved = e.solve();

console.log('ADD 2 3 => ' + solved.real_str()); // (λfx.f (f (f (f (f x)))))
console.log('ADD 2 3 => ' + solved.str()); // 5
```

## Build Manually

#### Requirements

- rake
- kmyacc ([Official Website (Japanese)](http://www005.upp.so-net.ne.jp/kmori/kmyacc/), [kmyacc-forked (English)](https://github.com/moriyoshi/kmyacc-forked))
- java 6 (or higher)

#### Build

type `rake` on the root directory.

