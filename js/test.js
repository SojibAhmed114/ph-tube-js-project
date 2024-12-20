function gets(time){
  const hours = parseInt(time / 3600);
  let remainingTime = time % 3600;
  const minute = parseInt(remainingTime / 60);
  remainingTime = remainingTime % 60;
  return `${hours} hours ${minute} minute ${remainingTime} second ago`;
}
console.log(gets(4489));