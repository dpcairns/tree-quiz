export function getRandomTree(treeArray) {
    const randomIndex = Math.floor(Math.random() * treeArray.length);

    return treeArray[randomIndex];
}