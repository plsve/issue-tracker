export const UserSeed = [
    {
        id: 1,
        username: 'pavel.vodicka',
        password: 'heslo',
        name: 'Pavel',
        surname: 'Vodička',
        photo: null,
        preference: 1,
        projects: [{
            id: 1
        }],
        // issues: [1, 2],
        // commentPosts: [1],
        permissions: [
            {
                id: 'MANAGE_PROJECTS'
            },
            {
                id: 'MANAGE_USERS'
            },
            {
                id: 'MANAGE_ISSUES'
            },
            {
                id: 'MANAGE_COMMENTS'
            },
            {
                id: 'MANAGE_DOCS'
            },
        ]
    },
    {
        id: 2,
        username: 'jan.rychly',
        password: 'heslo',
        name: 'Jan',
        surname: 'Rychlý',
        photo: null,
        preference: 2,
        projects: [{
            id: 1
        }],
        // issues: [3],
        // commentPosts: [2],
        permissions: [
            {
                id: 'MANAGE_ISSUES'
            },
            {
                id: 'MANAGE_DOCS'
            },
        ]
    }

]