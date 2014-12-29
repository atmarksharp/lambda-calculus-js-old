# lambda.js

Parser and Solver of Lambda Calculus

## Usage

### Preference

- Add &lt;script>path/to/lambda.js&lt;/script> into &lt;head>...&lt;/head>

### Basic Usage

```javascript
var e = lambda('(λx.x) a'); // this is simplest, and easy to understand.
console.log(e.solve().str()); // a

e = L('(λx.x) a'); // L() is shorthand for lambda().
console.log(e.solve().str()); // a

e = L('(#x.x) a'); // '#' is alias of 'λ'
console.log(e.solve().str()); // a
```

### Practical Usage

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

## License

MIT License
