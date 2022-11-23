const createTitle = (path) => {
  path = path.split('-');
  const rightPath = path.map((path) => {
    return path.substring(0, 1).toUpperCase() + path.substring(1, path.lenght);
  });
  return rightPath.join(' ');
};

export default createTitle;
