import { PERMISSION_IDS } from "src/common/constants/permission.enum";

export const UserSeed = [
    {
        id: 1,
        username: 'pavel.vodicka',
        password: 'heslo',
        name: 'Pavel',
        surname: 'Vodička',
        photo: 'abc.jpg',
        preference: 1,
        projects: [{
            id: 1
        }],
        // issues: [1, 2],
        // commentPosts: [1],
        permissions: [
            {
                id: PERMISSION_IDS.MANAGE_PROJECTS
            },
            {
                id: PERMISSION_IDS.MANAGE_USERS
            },
            {
                id: PERMISSION_IDS.MANAGE_COMMENTS
            },
            {
                id: PERMISSION_IDS.MANAGE_ISSUES
            },
            {
                id: PERMISSION_IDS.MANAGE_DOCS
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
                id: PERMISSION_IDS.MANAGE_ISSUES
            },
            {
                id: PERMISSION_IDS.MANAGE_DOCS
            },
        ]
    }

]