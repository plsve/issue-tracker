import { PERMISSION_IDS } from "src/constant/permission.enum";

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
        },{
            id: 2
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
            id: 2
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
    },
    {
        id: 3,
        username: 'john.dean',
        password: 'heslo',
        name: 'John',
        surname: 'Dean',
        photo: null,
        preference: 3,
        projects: [{
            id: 2
        }],
        issues: [],
        commentPosts: [],
        permissions: [
            {
                id: PERMISSION_IDS.MANAGE_ISSUES
            },
            {
                id: PERMISSION_IDS.MANAGE_DOCS
            },
        ]
    },
    {
        id: 4,
        username: 'naomi.woods',
        password: 'heslo',
        name: 'Naomi',
        surname: 'Woods',
        photo: null,
        preference: 4,
        projects: [{
            id: 2
        }],
        issues: [],
        commentPosts: [],
        permissions: [
            {
                id: PERMISSION_IDS.MANAGE_ISSUES
            },
            {
                id: PERMISSION_IDS.MANAGE_DOCS
            },
        ]
    },
    {
        id: 5,
        username: 'frank.jason',
        password: 'heslo',
        name: 'Frank',
        surname: 'Jason',
        photo: null,
        preference: 5,
        projects: [{
            id: 2
        }],
        issues: [],
        commentPosts: [],
        permissions: [
            {
                id: PERMISSION_IDS.MANAGE_ISSUES
            },
            {
                id: PERMISSION_IDS.MANAGE_DOCS
            },
        ]
    },
    {
        id: 6,
        username: 'christopher.dines',
        password: 'heslo',
        name: 'Christopher',
        surname: 'Dines',
        photo: null,
        preference: 6,
        projects: [{
            id: 2
        }],
        issues: [],
        commentPosts: [],
        permissions: [
            {
                id: PERMISSION_IDS.MANAGE_ISSUES
            },
            {
                id: PERMISSION_IDS.MANAGE_DOCS
            },
        ]
    },
    {
        id: 7,
        username: 'voy.summers',
        password: 'heslo',
        name: 'Voy',
        surname: 'Summers',
        photo: null,
        preference: 7,
        projects: [{
            id: 2
        }],
        issues: [],
        commentPosts: [],
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