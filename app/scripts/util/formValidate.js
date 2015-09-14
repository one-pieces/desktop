/**
 * Created by Administrator on 2015/9/14 0014.
 */
/**
 * ���֤������֤
 *
 * @param cardNo
 *            {String} ֤������
 * @returns info {Object} ���֤��Ϣ.
 *
 */
var getIdCardInfo = function(cardNo, birthday) {
    var info = {
        isTrue : false, // ���֤���Ƿ���Ч��Ĭ��Ϊ false
        year : null,// �����ꡣĬ��Ϊnull
        month : null,// �����¡�Ĭ��Ϊnull
        day : null,// �����ա�Ĭ��Ϊnull
        isMale : false,// �Ƿ�Ϊ���ԡ�Ĭ��false
        isFemale : false // �Ƿ�ΪŮ�ԡ�Ĭ��false
    };

    if (!cardNo || (15 != cardNo.length && 18 != cardNo.length) ) {
        info.isTrue = false;
        return info;
    }

    if (15 == cardNo.length) {
        var givenYear = birthday.substring(0,4);
        var givenMonth = birthday.substring(4,6);
        var givenDay = birthday.substring(6,8);
        var year = cardNo.substring(6, 8);
        var month = cardNo.substring(8, 10);
        var day = cardNo.substring(10, 12);
        if(givenYear !== year || givenMonth!== month || givenDay!== day) {
            info.isTrue = false;
            return info;
        }
        var p = cardNo.substring(14, 15); // �Ա�λ
        var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // ���������֤�е��������迼��ǧ��������ʹ��getYear()����
        if (birthday.getYear() != parseFloat(year)
            || birthday.getMonth() != parseFloat(month) - 1
            || birthday.getDate() != parseFloat(day)) {
            info.isTrue = false;
        } else {
            info.isTrue = true;
            info.year = birthday.getFullYear();
            info.month = birthday.getMonth() + 1;
            info.day = birthday.getDate();
            if (p % 2 == 0) {
                info.isFemale = true;
                info.isMale = false;
            } else {
                info.isFemale = false;
                info.isMale = true;
            }
        }
        return info;
    }

    if (18 == cardNo.length) {
        var givenYear = birthday.substring(0,4);
        var givenMonth = birthday.substring(4,6);
        var givenDay = birthday.substring(6,8);
        var year = cardNo.substring(6, 10);
        var month = cardNo.substring(10, 12);
        var day = cardNo.substring(12, 14);
        var p = cardNo.substring(14, 17);
        var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
        if(givenYear !== year || givenMonth!== month || givenDay!== day) {
            info.isTrue = false;
            return info;
        }
        // ������getFullYear()��ȡ��ݣ�����ǧ�������
        if (birthday.getFullYear() != parseFloat(year)
            || birthday.getMonth() != parseFloat(month) - 1
            || birthday.getDate() != parseFloat(day)) {
            info.isTrue = false;
            return info;
        }

        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// ��Ȩ����
        var Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// ���֤��֤λֵ.10����X

        // ��֤У��λ
        var sum = 0; // ������Ȩ��ͱ���
        var _cardNo = cardNo.split("");

        if (_cardNo[17].toLowerCase() == 'x') {
            _cardNo[17] = 10;// �����λΪx����֤���滻Ϊ10�����������
        }
        for ( var i = 0; i < 17; i++) {
            sum += Wi[i] * _cardNo[i];// ��Ȩ���
        }
        var i = sum % 11;// �õ���֤����λ��

        if (_cardNo[17] != Y[i]) {
            return info.isTrue = false;
        }

        info.isTrue = true;
        info.year = birthday.getFullYear();
        info.month = birthday.getMonth() + 1;
        info.day = birthday.getDate();

        if (p % 2 == 0) {
            info.isFemale = true;
            info.isMale = false;
        } else {
            info.isFemale = false;
            info.isMale = true;
        }
        return info;
    }
    return info;
}