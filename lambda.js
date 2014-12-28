var G;

if(typeof window == 'undefined'){
   G = GLOBAL;
}else{
  G = window;
}

(function(){
  // Utility ===========
  function _map(arr, func){
    var ret = [];
    for (var i=0; i<arr.length; i++) {
      ret.push(func(arr[i],i));
    };
    return ret;
  }

  // Builder =============

  // λ式を表すデータ型

  // 変数// 変数名は文字列であらわすことにする
  function Var(name){ 
    this.name = name;
    this.str = function(){
      return this.name;
    }
    this.removeGensym = function(){
      if(this.name[0] == '%'){
        this.name = gensymMap[this.name];
      }
      return this;
    }
  }
  function v(name){
    return new Var(name);
  }

  // λ抽象
  function Abs(arg, expr){ 
    this.arg = arg;
    this.expr = expr;
    this.str = function(){
      return '(λ'+this.arg+'.'+this.expr.str()+')';
    }
    this.removeGensym = function(){
      if(this.arg[0] == '%'){
        this.arg = gensymMap[this.arg];
      }
      this.expr = this.expr.removeGensym();
      return this;
    }
  }
  function L(arg, expr){
    return new Abs(arg, expr);
  }

  // 関数適用
  function App(expr1, expr2){
    this.expr1 = expr1;
    this.expr2 = expr2;
    this.str = function(){
      return '('+this.expr1.str()+' '+this.expr2.str()+')';
    }
    this.removeGensym = function(){
      this.expr1 = this.expr1.removeGensym();
      this.expr2 = this.expr2.removeGensym();
      return this;
    }
  }
  function app(expr1, expr2){
    return new App(expr1, expr2);
  }


  // 新しい変数名を作る補助的な関数
  var gensym_counter = 0;
  var gensymMap = {};
  function gensym(old){
    gensym_counter++; // gensym_counter の中身を一つ増やす
    if(old[0] == '%'){
      gensymMap['%'+gensym_counter] = gensymMap[old];
    }else{
      gensymMap['%'+gensym_counter] = old;
    }
    return '%'+gensym_counter; // g1, g2, g3, ... 等の文字列を返す
  }

  // [e2/x]e1 を求めて返す
  function subst(e2, x, e1){
    // console.log('subst: [e2/x]e1 = [ '+e2.str()+' / '+x+' ] '+e1.str());

    if(e1 instanceof Var){
      var y = e1.name;
      return (x == y)? e2: new Var(y)
    }else if(e1 instanceof Abs){
      var y = e1.arg;
      var e = e1.expr;
      var y_ = gensym(y);
      var ne0 = subst(new Var(y_), y, e);
      var ne2 = subst(e2, x, ne0);
      return new Abs(y_, ne2);
    }else if(e1 instanceof App){
      var e = e1.expr1;
      var e_ = e1.expr2;
      var ne1 = subst(e2, x, e);
      var ne2 = subst(e2, x, e_);
      return new App(ne1, ne2);
    }
  }

  // e を受け取り、e -> e' となる e' のリストを返す
  function step(e){
    // console.log('step: e = ' + e.str());

    if(e instanceof Var){
      return [];
    }else if(e instanceof Abs){
      var x = e.arg; 
      var e0 = e.expr;

      // (R-Abs) より
      var ret = _map(step(e0),function(e0_){
        return new Abs(x,e0_)
      });

      return ret;
    }else if(e instanceof App){
      var e1 = e.expr1;
      var e2 = e.expr2;

      // (R-Beta) より
      var list1;
      if(e1 instanceof Abs){
        var x = e1.arg;
        var e0 = e1.expr;
        var ne0 = subst(e2, x, e0);
        list1 = [ne0];
      }else{
        list1 = [];
      }

      // (R-App1) より
      var list2 = _map(step(e1),function(e1_){
        return new App(e1_,e2)
      });

      // (R-App2) より
      var list3 = _map(step(e2),function(e2_){
        return new App(e1,e2_)
      });

      return list1.concat(list2).concat(list3);
    }
  }

  // 簡約できなくなるまで step を反復する
  function repeat(e){
    // console.log('repeat: e = ' + e.str());

    var list = step(e);
    if(list.length == 0){
      return e.removeGensym();
    }else{
      return repeat(list[0]);
    }
  }

  G.Var = Var;
  G.v = v;
  G.Abs = Abs;
  G.L = L;
  G.App = App;
  G.app = app;

  G.gensymMap = gensymMap;

  G.simplify = repeat;
})();


var e1 = L('x',v('x')); // λx.x
console.log(simplify(e1).str());

var e2 = app(e1, e1); // (λx.x) (λx.x)
console.log(simplify(e2).str());

var e3 = app(e2, e2); // ((λx. x) (λx. x)) ((λx. x) (λx. x))
console.log(simplify(e3).str());

var incl = L('n',L('f',L('x',app(v('f'),app(app(v('n'),v('f')),v('x')))))); // λnfx.f(nfx)
var _0 = L('f',L('x',app(v('f'),v('x'))));
var _1 = L('f',L('x',app(v('f'),app(v('f'),v('x')))));
var _2 = L('f',L('x',app(v('f'),app(v('f'),app(v('f'),v('x'))))));

// console.log(incl.str());
// console.log(_0.str());

var incl_0 = app(incl,_0);
console.log(simplify(incl_0).str());

// var incl_1 = app(incl,_1);
// console.log(simplify(incl_1).str());
