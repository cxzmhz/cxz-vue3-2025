declare module '*?worker' {
  import { Worker } from 'worker_threads';
  const worker: Worker;
  export default worker;
}
