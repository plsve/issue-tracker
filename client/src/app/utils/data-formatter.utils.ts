import { ISSUE_PRIORITIES } from "../constant/issue-priorities.enum";
import { ISSUE_STATUSES } from "../constant/issue-status.enum";

export class DataFormatter {

    // '15h '= '1d 7h' (d in man days) or '1d' if stripHours == true
    public getWorkTime(workHours, stripHours) {
        workHours = workHours + '';
        let res;
        
        if(+workHours <= 8){
            res = +workHours + 'h';
        } else {
            if(workHours.includes('.')){
                res = (Math.floor(+workHours.split('.')[0] / 8) + 'd ' + +workHours % 8 + 'h').trim();
            } else {         
                res = (Math.floor(+workHours / 8) + 'd ' + +workHours % 8 + 'h').trim();
            }
        }
        return stripHours ? res.split(' ')[0] : res;
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

    public getPriorityName(priority){

        switch(priority) {
            case ISSUE_PRIORITIES.VERY_LOW: return 'Very low';
            case ISSUE_PRIORITIES.LOW: return 'Low';
            case ISSUE_PRIORITIES.MEDIUM: return 'Medium';
            case ISSUE_PRIORITIES.HIGH: return 'High';
            case ISSUE_PRIORITIES.VERY_HIGH: return 'Very high';
        }

    }

    public capitalize(value){  
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

}