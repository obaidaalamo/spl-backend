export const resultData = (robotUsers: any[], counter: number): any[] => {
  const result = [];

  for (let x = 0; x < robotUsers.length; x++) {
    const element = robotUsers[x];
    let state = 0;
    if (element.multiplier <= counter) state = 1;
    result.push({
      user: element.user,
      points: element.points,
      multiplier: element.multiplier,
      speed: element.speed,
      state: state,
    });
  }

  return result;
};
