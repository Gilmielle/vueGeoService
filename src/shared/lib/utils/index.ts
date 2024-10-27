/**
 * Returns a tree of items, depending on ParentId and ID
 * @param array
 */
export const createTree = (array) =>  {
  const nodeMap = new Map();

  array.forEach(item => {
    nodeMap.set(item["ID"], { ...item, children: [] });
  });

  function buildTree(nodeId) {
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    const children = [];
    array.forEach(item => {
      if (item["ParentID"] === nodeId) {
        children.push(buildTree(item["ID"]));
      }
    });

    return { ...node, children };
  }

  const roots = array.filter(item => !item["ParentID"]);

  return roots.map(root => buildTree(root["ID"]));
}
