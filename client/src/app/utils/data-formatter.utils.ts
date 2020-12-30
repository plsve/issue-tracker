import { ISSUE_STATUSES } from "../constant/issue-status.enum";

export class DataFormatter {

    // 15h = 1d 7h (d in man days)
    public getWorkTime(workHours) {
        return +workHours <= 8 ? +workHours + 'h' : (+workHours.split('.')[0] / 8 + 'd ' + +workHours % 8 + 'h').trim();
    }

    public getStatusIconName(status){

        switch(status) {
            case ISSUE_STATUSES.OPEN: return 'radio_button_unchecked';
            case ISSUE_STATUSES.IN_PROGRESS: return 'timelapse';
            case ISSUE_STATUSES.NEEDS_INFORMATION: return 'info';
            case ISSUE_STATUSES.DONE: return 'check_circle';
            case ISSUE_STATUSES.CANCELED: return 'cancel';
        }

    }

}