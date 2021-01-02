import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IssueListComponent } from './issue-list/issue-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    {
        path: 'issues',
        component: IssueListComponent
    },
    {
        path: 'people',
        component: UserListComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [IssueListComponent, UserListComponent];