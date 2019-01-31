import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../features/nav/navBar/NavBar";
import EventDashboard from "../../features/event/eventDashboard/EventDashboard";
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

class App extends Component {
  render() {
    console.log("identity(3) = ", identity(3));
    console.log("identityf(3) = ", identityf(3));

    console.log("addf(3)(4)", addf(3)(4));
    console.log("liftf(mul)(5)(6)", liftf(mul)(5)(6));
    console.log("curry(mul, 5)(7)", curry(mul, 5)(7));
    console.log("inc(5)", inc(5));
    console.log("inc(inc(5))", inc(inc(5)));

    console.log("twice(mul)(3)", twice(mul)(3));
    console.log("twice(add)(11)", twice(add)(11));

    console.log("reverse(sub)(3,2)", reverse(sub)(3, 2));

    console.log("composeu(doubl, square)(5)", composeu(doubl, square)(5));

    console.log("composeb(add, mul)(2,3,7)", composeb(add, mul)(2, 3, 7));

    var limit_add = limit(add, 1);
    console.log("limit_add(3, 4)", limit_add(3, 4));
    console.log("limit_add(3, 5)", limit_add(3, 5));

    var index = from(0);
    console.log(index());
    console.log(index());
    console.log(index());

    var ind2 = to(from(1), 3);
    console.log("ind2", ind2());
    console.log("ind2", ind2());
    console.log("ind2", ind2());

    var ind3 = fromTo(0, 3);
    console.log("ind3()", ind3());
    console.log("ind3()", ind3());
    console.log("ind3()", ind3());
    console.log("ind3()", ind3());

    var ele = element(["a", "b", "c", "d"], fromTo(1, 3));
    console.log("ele()", ele());
    console.log("ele()", ele());
    console.log("ele()", ele());

    var ele = element(["a", "b", "c", "d"]);
    console.log("ele()", ele());
    console.log("ele()", ele());
    console.log("ele()", ele());
    console.log("ele()", ele());
    console.log("ele()", ele());

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
