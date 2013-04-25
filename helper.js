﻿var helper = {

	formatDateTime : function(time, type, resultType) {
		var timeStr = "";
		var len = 10;
		if(time == null || time == "") {
			return "";
		}
		if(typeof time === "string") {			
			time = new Date( Date.parse(time.replace(/-/g, "/")) );
		}
		switch(type) {
			case "year" :
				timeStr = time.getFullYear() + "-01" + "-01" + " " + "00" + ":00" + ":00";
				len = 4;
				break;
			case "month" :
				timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + ".01" + " " + "00" + ":00" + ":00";
				len = 7;
				break;
			case "day" :
				timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + "00" + ":00" + ":00";
				len = 10;
				break;
			case "hour" :
				timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + this.dateAddZero(time.getHours().toString()) + ":00" + ":00";
				len = 13;
				break;
			case "minute" :
				timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + this.dateAddZero(time.getHours().toString()) + ":" + this.dateAddZero(time.getMinutes().toString()) + ":00";
				len = 16;
				break;
			case "second" :
				timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + this.dateAddZero(time.getHours().toString()) + ":" + this.dateAddZero(time.getMinutes().toString()) + ":" + this.dateAddZero(time.getSeconds().toString());
				len = 19;
				break;
			case "SN" :
				timeStr = time.getFullYear() + this.dateAddZero((time.getMonth()+1).toString()) + this.dateAddZero(time.getDate().toString()) + this.dateAddZero(time.getHours().toString()) + this.dateAddZero(time.getMinutes().toString()) + this.dateAddZero(time.getSeconds().toString());
				len = 14;
				break;
			default :
				timeStr = time.getFullYear() + "-" + this.dateAddZero((time.getMonth()+1).toString()) + "-" + this.dateAddZero(time.getDate().toString()) + " " + "00" + ":00" + ":00";
		}
		if(resultType==="Date") {
			return new Date( Date.parse(timeStr.replace(/-/g, "/")) );
		} else if(resultType==="shortString") {
			return timeStr.slice(0, len);
		} else if(resultType==="tinyString") {
			return timeStr.slice(11, len);
		} 
		else {
			return timeStr;
		}
	},

	dateAddZero : function(str) {
		str = '0' + str;
		return str.length >= 3 ? str.slice(1, 3) : str;
	},
	
	calNByDateType : function(time, type) {
		var myTime = new Date( time.valueOf() );
		var n = 1;
		if(arguments[2]!==undefined) {
			n=arguments[2];
		}
		if(type==="hour") {
			myTime.setHours( myTime.getHours() + n );
		} else if(type==="day") {
			myTime.setDate( myTime.getDate() + n );
		} else if(type==="month") {
			myTime.setMonth( myTime.getMonth() + n );
		} else if(type==="year") {
			myTime.setFullYear( myTime.getFullYear() + n );
		}
		
		return myTime;
	},
	
	getCurrentWeek : function(today) {
		var re = [];
		var d = today.getDay() == 0 ? 7 : today.getDay();
		for(var i=1; i<=7; i++) {
			re.push( this.calNByDateType(today, "day", i-d) );
		}
		return re;
	},
	
	getQueryString : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
	
}