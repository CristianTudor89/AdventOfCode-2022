const path = require('path');
const fs = require('fs');

class TreeNode
{
    isFolder = false;
    childNodes = [];
    parentNode;

    constructor(name, size = 0)
    {
        this.name = name;
        this.size = size;

        if (size == 0)
            this.isFolder = true;
    }

    SetParentNode(parentNode)
    {
        this.parentNode = parentNode;
    }

    GetParentNode()
    {
        return this.parentNode;
    }

    AddChildNode(childNode)
    {
        this.childNodes.push(childNode);
    }

    GetChildNode(name)
    {
        for (let childNode of this.childNodes)
        {
            if (childNode.name == name)
                return childNode;
        }
    }
}

const input = fs.readFileSync(path.join(__dirname, 'day7.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')

let treeNodes = [];
let rootNode;
let currentTreeNode;
let totalSum = 0;
let folderSizes = [];

function GetFolderSize(treeNode)
{
    let size = 0;

    for (childNode of treeNode.childNodes)
    {
        if (childNode.isFolder)
            size += GetFolderSize(childNode);
        else
            size += childNode.size;
    }

    if (size <= 100000)
        totalSum += size;

    folderSizes.push(size);

    return size;
}

// Part 1
for (let line of input)
{
    let tokens = line.split(' ');

    // command
    if (tokens[0] == '$')
    {
        if (tokens[1] == 'cd')
        {
            if (tokens[2] == '/')
            {
                currentTreeNode = new TreeNode(tokens[2]);
                rootNode = currentTreeNode;
                treeNodes.push(currentTreeNode);
            }
            else if (tokens[2] == '..')
            {
                currentTreeNode = currentTreeNode.GetParentNode();
            }
            else
            {
                currentTreeNode = currentTreeNode.GetChildNode(tokens[2]);
            }
        }
    }
    // within ls command
    else
    {
        // folder
        if (isNaN(parseInt(tokens[0])))
        {
            let newFolder = new TreeNode(tokens[1]);

            newFolder.SetParentNode(currentTreeNode);

            currentTreeNode.AddChildNode(newFolder);
        }
        // file
        else
        {
            let newFile = new TreeNode(tokens[1], parseInt(tokens[0]));

            currentTreeNode.AddChildNode(newFile);
        }
    }
}

let rootFolderSize = GetFolderSize(rootNode);

console.log(totalSum);

// Part 2
const kTotalDiskSize = 70000000;
const kRequiredUnusedSize = 30000000;

let currentUnusedSize = kTotalDiskSize - rootFolderSize;

let min = Number.MAX_VALUE;

for (let size of folderSizes)
{
    if (size < min && size + currentUnusedSize >= kRequiredUnusedSize)
    {
        min = size;
    }
}

console.log(min);
