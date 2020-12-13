export const DocFolderSeed = [
    {
        id: 1,
        name: 'Documentation',
        project: 1,
        // docPages: [1],
        // childDocFolders: [2],
        parentDocFolder: null
    },
    {
        id: 2,
        name: 'Architecture',
        project: 1,
        // docPages: [2, 3],
        // childDocFolders: [],
        parentDocFolder: 1
    },
]