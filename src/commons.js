import moment from "moment";


export function DateDifferenceWithCurrentDate(earlyDate){
    let date = moment(earlyDate);
    let currentDate = moment();

    let type = "Y";
    let diff = currentDate.diff(date, "years", true);

    if(parseInt(diff)===0){ diff = currentDate.diff(date, "months", true); type="Mo"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "days", true); type="d"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "hours", true); type="h"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "minutes", true); type="m"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "seconds", true); type="s"};
    if(parseInt(diff)===0){ diff = currentDate.diff(date, "seconds", true); type="just now"};

    return diff.toFixed(2)+" "+type;
}


export function truncateTheText(text, to=45){
    if (!text) return '';
    if (text.length>to) return text.toString().substring(0, to)+'...';
    return text;
}