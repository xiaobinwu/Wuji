if(!Date.prototype.add) {
    Date.prototype.add = function (obj) { // obj = {year:1,month:-1,day:2};
        var year = this.getFullYear(), month = this.getMonth(),time=0;
        for (var q in obj) {
            if (q == "year") {
                year += obj[q]
            } else if (q == "month") {
                month += obj[q];
                if(month>12){
                    year += parseInt(month/12);
                    month -= 12;
                }else if(month<1){
                    month = 12+month;
                    year += parseInt(month/12);
                }
            } else if (q == "day") {
                time = obj[q] * 24 * 60 * 60 * 1000;
            }
        }
        return new Date(new Date(year+"/"+(month+1)+"/"+this.getDate()).getTime()+time);
    }
}

/*
* 添加day
*/
if(!Date.prototype.addDay) {
    Date.prototype.addDay = function(day){
        var y = this.getFullYear(), m = this.getMonth(), d = 0;
        d = day * 24 * 60 * 60 * 1000;
        return new Date(new Date(y + "/" + (m + 1) + "/" + this.getDate()).getTime() + d);
    }
}

/*
* 添加month
*/
if(!Date.prototype.addMonth) {
    Date.prototype.addMonth = function(month){
        month = parseInt(month);
        var y = this.getFullYear(), m = this.getMonth();
        m += month;
        if(m > 12){
            y += parseInt(m/12);
            m -= 12;
        }else if(m < 1){
            m = 12 + m;
            y += parseInt(m/12);
        }
        return new Date(new Date(y + "/" + (m + 1) + "/" + this.getDate()).getTime());
    }
}

/*
* 添加year
*/
if(!Date.prototype.addYear) {
    Date.prototype.addYear = function(year){
        year = parseInt(year);
        var y = this.getFullYear(), m = this.getMonth();
        y += year;
        return new Date(new Date(y + "/" + (m + 1) + "/" + this.getDate()).getTime());
    }
}

/*
* 格式化，eg：yyyy-MM-dd（2016-01-01）
*/
if(!Date.prototype.format) {
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }

        return format;
    }
}

/*
* date 工具
*/

var DateUtil = {
    /*
    * 解析时间
    * str = "2016/01/01 00:00"
    */
    magicTime: function(str){
        if(!str) return '';
        var date = new Date(str.replace(/-/g,"/")), now = new Date();
        if(date > now){
            return '刚刚';
        }
        function doubleNumTime(num) {
            num += "";
            return num.length == 1 ? "0" + num : num;
        }
        if (typeof serviceDateOffset == "string") {
            now = new Date(now.getTime() + serviceDateOffset);
        }
        var year = now.getFullYear(),
            month = now.getMonth()+1,
            day = now.getDate(),
            nowDate = new Date(year + "/" + month + "/" + day),
            hour = now.getHours(),
            minutes = now.getMinutes(),
            yestoday = nowDate.add({ day: -1 }),
            tomorrow = nowDate.add({ day: 1 });
        var maxDate = new Date("2900/01/01").getTime(), miniDate = new Date("2000/01/01").getTime();
        var dateObj = new Date(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()),
            dateHours = date.getHours(),
            dateMinu = date.getMinutes(),
            dateTime = date.getTime(),
            nowTime = now.getTime(),
            oneHourTime = 60*60*1000;
        if (date.toString() == "Invalid Date") {
            return str;
        }
        if (date.getTime() >= maxDate) {
            return '很久以后';
        } else if (date.getTime() <= miniDate) {
            return '很久以前';
        } else {
            if (yestoday.getTime() == dateObj.getTime()) {
                return '昨天 ' + doubleNumTime(date.getHours()) + ":" + doubleNumTime(date.getMinutes());
            } else if (tomorrow.getTime() == dateObj.getTime()) {
                return '明天 ' + doubleNumTime(date.getHours()) + ":" + doubleNumTime(date.getMinutes()); ;
            } else if (dateObj.getTime() == nowDate.getTime()) {
                if (dateTime > nowTime - oneHourTime * 4 && dateTime < nowTime - oneHourTime) {  //目标时间小于当前时间，并且不超过4小时
                    return (hour - dateHours) + '小时前';
                } else if (dateTime < nowTime + oneHourTime * 4 && dateTime > nowTime + oneHourTime) {  //目标时间大于当前时间，并且不超过4小时
                    return (dateHours - hour) + '小时后';
                } else if (dateHours == hour || (dateTime > nowTime && dateTime < nowTime + oneHourTime) || (dateTime < nowTime && dateTime > nowTime - oneHourTime)) {  // 目标时间与当前时间
                    var minutesDiff = Math.floor((dateTime - nowTime) / 60000);
                    if(minutesDiff==0||minutesDiff==1){
                        return '刚刚';
                    }else if(minutesDiff>0){
                        return minutesDiff + '分钟后';
                    } else {
                        return (minutesDiff*-1) + '分钟前';
                    }
                }else{
                    return '今天 ' + doubleNumTime(dateHours) + ":" + doubleNumTime(dateMinu);
                }
            }
            return str;
        }
    },
    /*
    * 解析时间(将时分秒去掉)
    * str = "2016/01/01 00:00"
    */
    magicDate: function(time){
        var str = this.magicTime(time);
        var idx = str.indexOf(" ");
        if (idx !== -1) {
            str = str.substr(0, idx);
        }
        return str;
    }
}

module.exports = DateUtil;