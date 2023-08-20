import { Progress } from 'cnp-progress';

const init = () => {
  const total = 50;
  let count = 0;

  const progress = Progress.create({ total: total });

  const iv = setInterval(() => {
    count++;
    progress.update();
    if (count == total) {
      clearInterval(iv);
    }
  }, 150);
};

init();
