import * as drake from 'https://deno.land/x/drake@v1.6.0/mod.ts';

drake.desc('Minimal Drake task');
drake.task('hello', [], async () => {
  console.log('Hello from Drake');
  await drake.sh('deno run --allow-env main.ts');
});

drake.run();
