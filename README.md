# lambda.js

Parser and Solver of Lambda Calculus

## Usage

### Preference

- Add &lt;script>path/to/lambda.js&lt;/script> into &lt;head>...&lt;/head>

### Basic Usage

```javascript
var e = L('(λx.x) a');
console.log(e.solve().str()); // a

e = lambda('(λx.x) a');
console.log(e.solve().str()); // a

e = L('(#x.x) a'); // '#' means the lambda sign
console.log(e.solve().str()); // a
```

### Practical Usage

```javascript
var e = L('ADD 2 3',{
  'ADD':'(λmnfx.m f (n f x))', // On current version, '(λmnfx.mf(nfx))' is wrong. sorry :(
  '2':'(λfx.f (f x))',
  '3':'(λfx.f (f (f x)))',
  '5':'(λfx.f (f (f (f (f x)))))'
});

var solved = e.solve();

console.log('ADD 2 3 => ' + solved.real_str()); // (λfx.f (f (f (f (f x)))))
console.log('ADD 2 3 => ' + solved.str()); // 5
```

## License

MIT License
