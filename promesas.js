const {Observable} = require('rxjs');

const doSomething = () => {
  return new Promise(() =>{
    resolve('valor1');
  });
}
const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor1')
  })
}

// (async () => {
//   const rta = awit doSomething();
//   console.log(rta);
// })();

(() =>{
 const obs$ = doSomething$();
 obs$.subscribe(rta =>{
  console-log(rta);
 })
})
