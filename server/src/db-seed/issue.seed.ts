import { ISSUE_STATUSES } from "src/constant/issue-status.enum";
import { ISSUE_TYPES } from "src/constant/issue-type.enum";

export const IssueSeed = [
    {
        id: 1,
        name: 'IST-1',
        verboseName: 'Backend REST service',
        type: ISSUE_TYPES.EPIC,
        description: 'Create REST service with these endpoints...',
        status: ISSUE_STATUSES.OPEN,
        priority: 1,
        hoursEstimated: 16.5,
        hoursRemaining: 16.5,
        hoursSpent: 0,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: null,
        childIssues: [2],
        parentIssue: null,
        created: new Date(),
        edited: new Date(),
        resolved: null,
        createdByUser: 1,
        editedByUser: 1
    },
    {
        id: 2,
        name: 'IST-2',
        verboseName: 'Create controller layer',
        type: ISSUE_TYPES.TASK,
        description: 'Create controller layer with this specification',
        status: ISSUE_STATUSES.IN_PROGRESS,
        priority: 2,
        hoursEstimated: 8,
        hoursRemaining: 5,
        hoursSpent: 2,
        gitLink: 'https://github.com/plsve',
        // commentPosts: [1],
        project: 1,
        user: 1,
        childIssues: [3],
        parentIssue: 1,
        created: new Date(),
        edited: new Date(),
        resolved: null,
        createdByUser: 1,
        editedByUser: 1
    },
    {
        id: 3,
        name: 'IST-3',
        verboseName: 'Create register endpoint',
        type: ISSUE_TYPES.TASK,
        description: 'Create register endpoint method with these parameters..',
        status: ISSUE_STATUSES.NEEDS_INFORMATION,
        priority: 3,
        hoursEstimated: 6,
        hoursRemaining: 0,
        hoursSpent: 12,
        gitLink: 'https://github.com/plsve',
        commentPosts: [2],
        project: 1,
        user: 2,
        childIssues: [],
        parentIssue: 2,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 4,
        name: 'IST-4',
        verboseName: 'Fix delete endpoint',
        type: ISSUE_TYPES.BUG,
        description: 'Fix delete endpoint we talked about, here\'s what we\'ve agreed on..',
        status: ISSUE_STATUSES.CANCELED,
        priority: 4,
        hoursEstimated: 12,
        hoursRemaining: 6,
        hoursSpent: 20,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: 2,
        childIssues: [],
        parentIssue: 2,
        created: new Date(),
        createdByUser: 1,
    },
    {
        id: 5,
        name: 'ISF-5',
        verboseName: 'Fix delete endpoint',
        type: ISSUE_TYPES.TASK,
        description: 'Create register endpoint method with these parameters..',
        status: ISSUE_STATUSES.DONE,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 2,
        user: 1,
        childIssues: [],
        parentIssue: null,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 6,
        name: 'IST-6',
        verboseName: 'Issue without epic',
        type: ISSUE_TYPES.TASK,
        description: 'This is a test issue description',
        status: ISSUE_STATUSES.OPEN,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: 1,
        childIssues: [7],
        parentIssue: null,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 7,
        name: 'IST-7',
        verboseName: 'Child issue without epic',
        type: ISSUE_TYPES.TASK,
        description: 'This is a test child issue description',
        status: ISSUE_STATUSES.OPEN,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: 1,
        childIssues: [],
        parentIssue: 6,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 8,
        name: 'IST-8',
        verboseName: 'Build mars rover',
        type: ISSUE_TYPES.EPIC,
        description: 'This is a test child issue description',
        status: ISSUE_STATUSES.OPEN,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: null,
        childIssues: [9, 10],
        parentIssue:  null,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 9,
        name: 'IST-9',
        verboseName: 'Forge a wheel',
        type: ISSUE_TYPES.TASK,
        description: 'This is a test child issue description',
        status: ISSUE_STATUSES.OPEN,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: 1,
        childIssues: [],
        parentIssue:  8,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 10,
        name: 'IST-10',
        verboseName: 'Trunk is not working',
        type: ISSUE_TYPES.BUG,
        description: 'This is a test child issue description',
        status: ISSUE_STATUSES.IN_PROGRESS,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: 1,
        childIssues: [],
        parentIssue:  8,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
    {
        id: 11,
        name: 'IST-11',
        verboseName: 'Empty epic',
        type: ISSUE_TYPES.EPIC,
        description: 'This is a test child issue description',
        status: ISSUE_STATUSES.OPEN,
        priority: 5,
        hoursEstimated: 10,
        hoursRemaining: 2,
        hoursSpent: 5,
        gitLink: 'https://github.com/plsve',
        commentPosts: [],
        project: 1,
        user: null,
        childIssues: [],
        parentIssue:  null,
        created: new Date(),
        resolved: new Date(),
        createdByUser: 1,
    },
]