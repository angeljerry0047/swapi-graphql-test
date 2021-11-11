const compare = (a, b) => {
  if (a.node.name < b.node.name) {
    return -1;
  }
  if (a.node.name > b.node.name) {
    return 1;
  }
  return 0;
};
export default compare;
