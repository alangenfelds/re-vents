import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../features/nav/navBar/NavBar";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import TestComponent from "../../features/Testarea/TestCompoenent";
import ModalManager from "../../features/modals/ModalMananger";

const identity = arg => arg;

// const identityf = arg => () => arg;
function identityf(x) {
  return function() {
    return x;
  };
}

// const addf = a => b => a + b;
function addf(first) {
  return function(second) {
    return first + second;
  };
}

// const liftf = func => a => b => func(a, b);
function liftf(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}

// const curry = (func, a) => b => func(a, b);
function curry(func, first) {
  return function(second) {
    return func(first, second);
  };
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;

const doubl = a => a * 2;
const square = a => a * a;

// const binary = (a, b) => {
//   // binary function - means it takes 2 arguments
//   return a * b;
// };

const twice = func => {
  return function(a) {
    return func(a, a);
  };
};

function inc(arg) {
  return add(arg, 1);
}

// const reverse = binfunc => (a, b) => binfunc(b, a);

// ES6 version
const reverse = binfunc => (...args) => binfunc(...args.reverse());

// calls 2 unary (1 arg) fucntions
const composeu = (f1, f2) => arg => f2(f1(arg));

const composeb = (f1, f2) => (arg1, arg2, arg3) => f2(f1(arg1, arg2), arg3);

const limit = (func, count) => (a, b) => {
  if (count >= 1) {
    count = count - 1;
    return func(a, b);
  }
};

// generator function
const from = start => () => {
  // var next = start;
  return start++;
  // return next;
};

const to = (genf, limit) => () => {
  var value = genf();
  if (value < limit) {
    return value;
  }
};

const fromTo = (start, end) => to(from(start), end);

const element = (arr, genf) => () => {
  if (!genf) {
    genf = fromTo(0, arr.length);
  }
  var index = genf();
  if (index !== undefined) {
    return arr[index];
  }
};

function filter(genf, predicate) {
  return function recur() {
    var value = genf();
    if (value === undefined || predicate(value)) {
      return value;
    }
    return recur();
  };
}

// const concat = (genf1, genf2) => () => {
//   var value = genf1();
//   if (value !== undefined) {
//     return value;
//   } else {
//     value = genf2();
//     if (value !== undefined) {
//       return value;
//     }
//   }
// }

function concat(genf1, genf2) {
  var gen = genf1;
  return function() {
    var value = gen();
    if (value !== undefined) {
      return value;
    }
    gen = genf2;
    return gen();
  };
}

function gensymf(prefix) {
  var counter = 0;
  return function() {
    counter++;
    return prefix + counter;
  };
}

// function fibonaccif(a,b) {
//   var arr = [a, b];
//   var pos = 0;
//   return function () {
//     arr.push(arr[pos] + arr[pos + 1])
//     return arr[pos++]
//   }
// }

function fibonaccif(a, b) {
  return function() {
    var next = a;
    a = b;
    b += next;
    return next;
  }
}


// const counter = (val) => ({
//   up: () => ++val,
//   down: () => --val,
// })

function counter(val) {
  return {
    up: () => ++val,
    down: () => --val,
  }
}

function revocable(binaryf) {
  return {
    invoke: (a, b) => binaryf && binaryf(a, b),
    revoke: function() {
      binaryf = undefined;
    },
  }
}

function m(val, src) {
  return {
    value: val,
    source: (typeof src === 'string') ? src : String(val)
  }
}

// function addm(m1, m2) {
//   return {
//     value: m1.value + m2.value,
//     source: `(${m1.source}+${m2.source})`,
//   }
// }
function addm(a, b) {
  return m(a.value + b.value, `(${a.source}+${b.source})`)
}


function liftm(binaryf, op) {
  return function(a, b) {
    if (typeof a === 'number') {
      a = m(a);
    }
    if (typeof b === 'number') {
      b = m(b);
    }
    return m(
      binaryf(a.value, b.value), `(${a.source} ${op} ${b.source})`);
  };
}

function exp(value) {
  return (Array.isArray(value))
    ? value[0](
        exp(value[1]),
        exp(value[2])
      )
    : value;

}

function addg(first) {
  function more(next) {
    if (next === undefined) {
      return first;
    }
    first = first + next;
    return more;
  }
  if (first !== undefined) {
    return more;
  }
}

function liftg(binaryf) {
  return function (first) {
    if (first === undefined) {
      return first;
    }
    return function more(next) {
      if (next === undefined) {
        return first;
      }
      first = binaryf(first, next);
      return more;
    }
  }
}

function arrayg(first) {
  var array = [];
  function more(next) {
    if (next === undefined) {
      return array;
    }
    array.push(next);
    return more;
  }

  return more(first);
}

const vector = () => {
  var array = [];
  return {
    append: val => array.push(val),
    // store: (pos, val) => array.splice(pos, 0, val),
    store: (pos, val) => array[+pos] = val,
    get: pos => array[pos],
    }
  }




class App extends Component {
  render() {


    var myvector = vector();
    myvector.append(7);
    myvector.append(1, 8);
    // console.log(myvector.get(0));
    // console.log(myvector.get(1));

    // console.log(arrayg(4)(0))

    // console.log(addg())
    // console.log(addg(2)())
    // console.log(addg(2)(7)())

    // console.log(liftg(mul)(3)(0)(4))

    // var sae = [mul, 5, 11];
    // console.log(exp(sae));
    // console.log(exp(42));

    // var nae = [
    //   Math.sqrt,
    //   [
    //     add,
    //     [square, 3],
    //     [square, 4]
    //   ]
    // ]

    // console.log(exp(nae));

    // var addm = liftm(add, "+");
    // console.log(JSON.stringify(addm(m(3), m(4))))
    // console.log(JSON.stringify(addm(3,4)))

    // console.log(JSON.stringify(addm(m(3), m(4))));
    // console.log(JSON.stringify(addm(m(1),m(Math.PI, "pi"))));

    // var rev = revocable(add);
    // var add_rev = rev.invoke;
    // console.log('add_rev(3,4)', add_rev(3,4));
    // rev.revoke();
    // console.log('add_rev(3,4)', add_rev(3,4));

    // var object = counter(10);
    // var up = object.up;
    // var down = object.down;
    // console.log('up()', up());
    // console.log('down()', down());
    // console.log('down()', down());
    // console.log('up()', up());

    // console.log("identity(3) = ", identity(3));
    // console.log("identityf(3) = ", identityf(3));

    // console.log("addf(3)(4)", addf(3)(4));
    // console.log("liftf(mul)(5)(6)", liftf(mul)(5)(6));
    // console.log("curry(mul, 5)(7)", curry(mul, 5)(7));
    // console.log("inc(5)", inc(5));
    // console.log("inc(inc(5))", inc(inc(5)));

    // console.log("twice(mul)(3)", twice(mul)(3));
    // console.log("twice(add)(11)", twice(add)(11));

    // console.log("reverse(sub)(3,2)", reverse(sub)(3, 2));

    // console.log("composeu(doubl, square)(5)", composeu(doubl, square)(5));

    // console.log("composeb(add, mul)(2,3,7)", composeb(add, mul)(2, 3, 7));

    // var limit_add = limit(add, 1);
    // console.log("limit_add(3, 4)", limit_add(3, 4));
    // console.log("limit_add(3, 5)", limit_add(3, 5));

    // var index = from(0);
    // console.log(index());
    // console.log(index());
    // console.log(index());

    // var ind2 = to(from(1), 3);
    // console.log("ind2", ind2());
    // console.log("ind2", ind2());
    // console.log("ind2", ind2());

    // var ind3 = fromTo(0, 3);
    // console.log("ind3()", ind3());
    // console.log("ind3()", ind3());
    // console.log("ind3()", ind3());
    // console.log("ind3()", ind3());

    // var ele = element(["a", "b", "c", "d"], fromTo(1, 3));
    // console.log("ele()", ele());
    // console.log("ele()", ele());
    // console.log("ele()", ele());

    // var ele = element(["a", "b", "c", "d"]);
    // console.log("ele()", ele());
    // console.log("ele()", ele());
    // console.log("ele()", ele());
    // console.log("ele()", ele());
    // console.log("ele()", ele());

    // var fil = filter(fromTo(0, 5), value => value % 3 === 0);
    // console.log("fil()", fil());
    // console.log("fil()", fil());
    // console.log("fil()", fil());

    // var con = concat(fromTo(0, 3), fromTo(0, 2));
    // console.log("con()", con());
    // console.log("con()", con());
    // console.log("con()", con());
    // console.log("con()", con());
    // console.log("con()", con());
    // console.log("con()", con());

    // var geng = gensymf("G");
    // var genh = gensymf("H");
    // console.log("geng()", geng());
    // console.log("genh()", genh());
    // console.log("geng()", geng());
    // console.log("genh()", genh());

    // var fib = fibonaccif(0, 1);
    // console.log('fib()', fib());
    // console.log('fib()', fib());
    // console.log('fib()', fib());
    // console.log('fib()', fib());
    // console.log('fib()', fib());
    // console.log('fib()', fib());
    // console.log('fib()', fib());

    let arr = [3,4,5,9];

    let res = arr.reduce((acc, currentValue, index) => {
      console.log(`acc - ${acc}, currentValue - ${currentValue}`);
      console.log('index', index)
      return acc + currentValue;
    })


    console.log('res', res);


    return (
      <div className="App">
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/editEvent/:id" component={EventForm} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/createEvent" component={EventForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
