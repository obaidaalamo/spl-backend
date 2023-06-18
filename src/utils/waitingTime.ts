export const waitingTime = async (time: number) => {
  await new Promise((res, error) => {
    setTimeout(() => res('ok'), time);
  });
};
