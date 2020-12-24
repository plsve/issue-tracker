export const CommentPostSeed = [
    {
        id: 1,
        user: 1,
        issue: 2,
        created: new Date(),
        edited: new Date(),
        content: 'I worked on this for 3 hours and solved it.',
        workedHours: 3
    },
    {
        id: 2,
        user: 2,
        issue: 3,
        created: new Date(),
        content: 'I worked on this for 5 hours and couldn\'t solve it. I\'ll continue tomorrow.',
        workedHours: 5
    },
    {
        id: 3,
        user: 2,
        issue: 3,
        created: new Date(),
        content: 'This task is hard.'
    },
]