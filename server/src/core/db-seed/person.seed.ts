export const PersonSeed = [
    {
        id: 1,
        username: 'pavel.vodicka',
        password: 'heslo',
        name: 'Pavel',
        surname: 'Vodička',
        photo: null,
        preference: 1,
        permissions: [
            {
                id: 'MANAGE_PROJECTS'
            },
            {
                id: 'MANAGE_USERS'
            },
            {
                id: 'MANAGE_TASKS'
            },
            {
                id: 'MANAGE_COMMENTS'
            },
            {
                id: 'MANAGE_DOCS'
            },
        ]
    }

]