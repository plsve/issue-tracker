export const MockData = {
    selectedProject: {
        "id": 1,
        "name": "Issue Tracker",
        "prefix": "IST",
        "created": "2021-07-08T11:59:17.282Z",
        "description": "This is the Issue Tracker project.",
        "users": [
            {
                "id": 1,
                "username": "pavel.vodicka",
                "name": "Pavel",
                "surname": "Vodička",
                "photo": "abc.jpg",
                "deleted": false
            }
        ],
        "issues": [
            {
                "id": 2,
                "status": "IN_PROGRESS",
                "commentPosts": [
                    {
                        "workedHours": "3.0"
                    }
                ]
            },
            {
                "id": 3,
                "status": "NEEDS_INFORMATION",
                "commentPosts": [
                    {
                        "workedHours": "5.0"
                    }
                ]
            },
            {
                "id": 4,
                "status": "CANCELED",
                "commentPosts": []
            },
            {
                "id": 1,
                "status": "OPEN",
                "commentPosts": []
            }
        ],
        "docFolders": [
            {
                "id": 1,
                "docPages": [
                    {
                        "id": 1
                    }
                ]
            },
            {
                "id": 2,
                "docPages": [
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    }
                ]
            }
        ]
    }
}