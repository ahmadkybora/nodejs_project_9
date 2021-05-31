const moment = require('jalali-moment');

exports.formatDate = (date: any) => {
    return moment(date).locale("fa").format("D MMM YYYY")
}
