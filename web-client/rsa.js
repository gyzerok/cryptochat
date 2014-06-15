'use strict';

var symbols = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,.!? ';

var rsa = {
    digits: undefined,
    e: undefined,
    d: undefined,
    m: undefined,

    init: function (digits) {
        rsa.digits = digits || 16;
        var p = rsa._randPrimeBigNumber();
        var q = rsa._randPrimeBigNumber();
        while (q.eq(p)) q = rsa._randPrimeBigNumber();

        rsa.m = p.times(q);
        var n = p.minus(1).times(q.minus(1));
        rsa.e = rsa._randPublicKey(n);
        rsa.d = rsa._findPrivateKey(n);
        // TODO: Ask wtf
        if (!rsa.d.gt(0)) return rsa.init();


        console.log('p = ' + p.toString() + '; q = ' + q.toString());
        console.log('e = ' + rsa.e.toString() + '; d = ' + rsa.d.toString() + '; m = ' + rsa.m.toString());
        console.log('e * d % n = ' + rsa.d.times(rsa.e).mod(n));
    },

    encrypt: function (str, e, m) {
        return _.map(str, function (char) {
            var i = symbols.indexOf(char);
            return rsa._powm(BigNumber(i), e, m).toString();
        });
    },

    decrypt: function (data) {
        return _.reduce(data, function (memo, el) {
            var i = rsa._powm(BigNumber(el), rsa.d, rsa.m);
            return memo + symbols[i];
        }, '');
    },

    _randBigNumber: function () {
        var str = '' + Math.floor(Math.random() * 9 + 1);
        for (var i = 0; i < rsa.digits - 1; i++) str += Math.floor(Math.random() * 9);
        return BigNumber(str);
    },

    _isPrimeBigNumber: function (number) {
        var i = BigNumber(2);
        while (i < 13) {
            if (!rsa._powm(i, number, number).eq(i.mod(number))) return false;
            i = i.plus(1);
        }
        return true;
    },

    _randPrimeBigNumber: function () {
        var n = rsa._randBigNumber();
        while (!rsa._isPrimeBigNumber(n)) n = n.plus(1);
        return n;
    },

    _gcd: function (a, b) {
        a = BigNumber(a);
        b = BigNumber(b);
        while (!b.eq(0)) {
            var c = a.mod(b);
            a = b;
            b = c;
        }
        return a.abs();
    },

    _randPublicKey: function (n) {
        var e = 3;
        while (!rsa._gcd(e, n).eq(1)) e++;
        return BigNumber(e);
    },

    _findPrivateKey: function (n) {
        var E = [
            [BigNumber(1), BigNumber(0)],
            [BigNumber(0), BigNumber(1)]
        ];
        var a = n;
        var b = rsa.e;

        while (true) {
            var r = a.mod(b);
            if (r.eq(0)) return E[1][1];
            var q = a.div(b).floor();
            var tmp = [
                [BigNumber(0), BigNumber(0)],
                [BigNumber(0), BigNumber(0)]
            ];
            var newE = [
                [BigNumber(0), BigNumber(1)],
                [BigNumber(1), q.neg()]
            ];
            for (var i = 0; i < 2; i++)
                for (var j = 0; j < 2; j++)
                    for (var k = 0; k < 2; k++)
                        tmp[i][j] = tmp[i][j].plus(E[i][k].times(newE[k][j]));
            E = tmp;
            a = b;
            b = r;
        }
    },

    _powm: function (number, power, divisor) {
        var b = BigNumber(1);
        while (!power.eq(0)) {
            if (power.mod(2).eq(0)) {
                power = power.div(2);
                number = number.times(number).mod(divisor);
            }
            else {
                power = power.minus(1);
                b = b.times(number).mod(divisor);
            }
        }
        return b;
    }
};