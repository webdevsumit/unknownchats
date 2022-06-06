import moment from "moment";


export function DateDifferenceWithCurrentDate(earlyDate){
    let date = moment(earlyDate);
    let currentDate = moment();

    let type = "year";
    let diff = currentDate.diff(date, "Y", true);

    if(parseInt(diff)===0){diff = currentDate.diff(date, "months", true); type="Mo"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "days", true); type="d"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "hours", true); type="h"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "minutes", true); type="m"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "seconds", true); type="s"};

    return diff.toFixed(2)+" "+type;
}