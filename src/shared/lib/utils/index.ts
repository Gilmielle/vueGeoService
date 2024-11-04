import type { VehicleGroup } from '@/shared/types'

/**
 * Returns a tree of items, depending on ParentId and ID
 * @param array
 */
export const createTree = (array: VehicleGroup[]): VehicleGroup[] =>  {
  const nodeMap = new Map();

  array.forEach(item => {
    nodeMap.set(item["ID"], { ...item, children: [] });
  });

  function buildTree(nodeId: string): VehicleGroup[] {
    const node = nodeMap.get(nodeId);
    if (!node) return [];

    const children: VehicleGroup[] = [];
    array.forEach(item => {
      if (item["ParentID"] === nodeId) {
        const subtree = buildTree(item["ID"]);
        if (subtree.length > 0) {
          children.push(...subtree);
        }
      }
    });

    return [{ ...node, children }];
  }

  const roots = array.filter(item => !item["ParentID"]);

  return roots.flatMap(root => buildTree(root["ID"]));
}

export const getNumberWithZeroPrefix = (number = 0) => {
  return (number < 10) ? "0" + number : number;
}

export const getDateString = (date = new Date()) => {
  // return `${date.getFullYear()}${getNumberWithZeroPrefix(date.getMonth() + 1)}${getNumberWithZeroPrefix(date.getDate())}-${date.getHours()}.${date.getMinutes()}`
  return `${date.getFullYear()}${getNumberWithZeroPrefix(date.getMonth() + 1)}${getNumberWithZeroPrefix(date.getDate())}`
}
