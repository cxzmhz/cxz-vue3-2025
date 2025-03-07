// 求傅尔马契数列的第n项。
const fn = (n: number): number => {
  return n <= 1 ? n : fn(n - 1) + fn(n - 2);
};
self.addEventListener('message', (e) => {
  const num = e.data.num;
  const res = fn(num);
  self.postMessage(res);
});
