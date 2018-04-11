import './style/common.styl';
import tpl from './test.html';

function Hello() {
  console.log('hello world');
  this.tpl = tpl;
  const app = document.getElementById('app');
  app.innerHTML = this.tpl;
}

Hello.prototype.sayHello = () => {
  console.log('Hello World')
};

new Hello();
