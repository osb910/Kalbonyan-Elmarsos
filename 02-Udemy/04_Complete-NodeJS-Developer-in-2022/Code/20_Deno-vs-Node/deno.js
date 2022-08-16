const food = Deno.args[0];

if (food === 'love') {
  console.log('Deno is born! 3>'); // ربنا يجعله خير خلف لخير سلف
} else {
  console.log('🥚 This egg needs some love.'); // مسكينة البيضة
}

setTimeout(() => {
  console.log('check');
}, 1000);
console.table(Deno.metrics());
