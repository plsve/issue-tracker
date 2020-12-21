import { ISSUE_STATUSES } from "./issue-status.enum";
import { ISSUE_TYPES } from "./issue-type.enum"
import { WorkHourScale } from "./work-hour-scale.const";

export const ValidationMessages = {
    wrongIssueType: function(){
        return 'type must be one of [' + Object.values(ISSUE_TYPES) + ']'
    },
    
    wrongStatusType: function(){
        return 'status must be one of [' + Object.values(ISSUE_STATUSES) + ']'
    },

    wrongDecimalPlaceLength: function(fieldName: string){
        return 'maximum decimal place length for ' + fieldName + ' is ' + WorkHourScale.scale;
    }
}