import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function readDirectory(dir) {
    try {
        return await fs.readdir(dir, { withFileTypes: true });
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return [];
    }
}

function createTreeNode(name) {
    return { name, children: [] };
}

async function processDirectoryEntry(file, dir, depth, currentDepth) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
        return await buildTree(filePath, depth, currentDepth + 1);
    } else {
        return createTreeNode(file.name);
    }
}

async function buildTree(dir, depth, currentDepth = 0) {
    if (depth !== undefined && currentDepth > depth) return null;

    const tree = createTreeNode(path.basename(dir));
    const files = await readDirectory(dir);

    for (const file of files) {
        const subtree = await processDirectoryEntry(file, dir, depth, currentDepth);
        if (subtree) {
            tree.children.push(subtree);
        }
    }

    return tree;
}

function printTree(tree, prefix = '', isRoot = true) {
    if (!tree || !Array.isArray(tree.children)) return;

    if (isRoot) {
        console.log(tree.name);
    }

    const childrenCount = tree.children.length;
    tree.children.forEach((child, index) => {
        const isLast = index === childrenCount - 1;
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        console.log(prefix + (isLast ? '└── ' : '├── ') + child.name);
        if (child.children) {
            printTree(child, newPrefix, false);
        }
    });
}

(async () => {
    const args = process.argv.slice(2);
    const dir = args[0] ? path.resolve(__dirname, args[0]) : __dirname;
    const depthArgIndex = args.findIndex(arg => arg === '--depth' || arg === '-d');
    const depth = depthArgIndex !== -1 ? parseInt(args[depthArgIndex + 1]) : undefined;

    const tree = await buildTree(dir, depth);
    printTree(tree, '', true);
})();
