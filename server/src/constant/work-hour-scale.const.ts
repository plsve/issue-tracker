export const WorkHourScale = {
    precision: 4,
    scale: 1,

    getValidationMessage: function(fieldName: string){
        return 'Maximum decimal place length for ' + fieldName + ' is: ' + WorkHourScale.scale;
    }
}