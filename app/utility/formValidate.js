/**
 * Created by Administrator on 2015/9/14 0014.
 */

/**
 * Created by Administrator on 2015/9/14 0014.
 */
/**
 * 身份证号码验证
 *
 * @param cardNo
 *            {String} 证件号码
 * @returns info {Object} 身份证信息.
 *
 */
'use strict';
     var checkForm = {
        // 左邊補0
         padLeft: function(str,lenght) {
             str = str.toString();
             if (str.length >= lenght) {
                 return str;
             } else {
                 return this.padLeft("0" + str, lenght);
             }
         },


         getIdCardInfo : function(cardNo) {
             var info = {
                 isTrue : false, // 身份证号是否有效。默认为 false
                 year : null,// 出生年。默认为null
                 month : null,// 出生月。默认为null
                 day : null,// 出生日。默认为null
                 isMale : false,// 是否为男性。默认false
                 isFemale : false, // 是否为女性。默认false
                 sex: null //默认为空
             };

             if (!cardNo || (15 != cardNo.length && 18 != cardNo.length) ) {
                 info.isTrue = false;
                 return info;
             }

             if (15 == cardNo.length) {
                 var year = cardNo.substring(6, 8);
                 var month = cardNo.substring(8, 10);
                 var day = cardNo.substring(10, 12);
                 var p = cardNo.substring(14, 15); // 性别位
                 var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
                 if (birthday.getYear() != parseFloat(year)
                     || birthday.getMonth() != parseFloat(month) - 1
                     || birthday.getDate() != parseFloat(day)) {
                     info.isTrue = false;
                 } else {
                     info.isTrue = true;
                     info.year = birthday.getFullYear();
                     info.month = checkForm.padLeft(birthday.getMonth() + 1, 2);
                     info.day = checkForm.padLeft(birthday.getDate(), 2);
                     if (p % 2 == 0) {
                         info.isFemale = true;
                         info.isMale = false;
                     } else {
                         info.isFemale = false;
                         info.isMale = true;
                     }
                 }
                 if(info.isFemale) {
                     info.sex = '0';
                 } else {
                     info.sex = '1';
                 }
                 return info;
             }

             if (18 == cardNo.length) {
                 var year = cardNo.substring(6, 10);
                 var month = cardNo.substring(10, 12);
                 var day = cardNo.substring(12, 14);
                 var p = cardNo.substring(14, 17);
                 var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
                 if (birthday.getFullYear() != parseFloat(year)
                     || birthday.getMonth() != parseFloat(month) - 1
                     || birthday.getDate() != parseFloat(day)) {
                     info.isTrue = false;
                     return info;
                 }

                 var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
                 var Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X

                 // 验证校验位
                 var sum = 0; // 声明加权求和变量
                 var _cardNo = cardNo.split("");

                 if (_cardNo[17].toLowerCase() == 'x') {
                     _cardNo[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
                 }
                 for ( var i = 0; i < 17; i++) {
                     sum += Wi[i] * _cardNo[i];// 加权求和
                 }
                 var i = sum % 11;// 得到验证码所位置

                 if (_cardNo[17] != Y[i]) {
                     return info.isTrue = false;
                 }

                 info.isTrue = true;
                 info.year = birthday.getFullYear();
                 info.month = checkForm.padLeft(birthday.getMonth() + 1, 2);
                 info.day = checkForm.padLeft(birthday.getDate(), 2);

                 if (p % 2 == 0) {
                     info.isFemale = true;
                     info.isMale = false;
                 } else {
                     info.isFemale = false;
                     info.isMale = true;
                 }
                 if(info.isFemale) {
                     info.sex = '0';
                 }else {
                     info.sex = '1';
                 }
                 return info;
             }
             return info;
         }
}