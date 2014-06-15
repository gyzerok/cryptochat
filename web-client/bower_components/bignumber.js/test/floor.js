var count = (function floor(BigNumber) {
    var start = +new Date(),
        log,
        error,
        passed = 0,
        total = 0;

    if (typeof window === 'undefined') {
        log = console.log;
        error = console.error;
    } else {
        log = function (str) { document.body.innerHTML += str.replace('\n', '<br>') };
        error = function (str) { document.body.innerHTML += '<div style="color: red">' +
          str.replace('\n', '<br>') + '</div>' };
    }

    if (!BigNumber && typeof require === 'function') BigNumber = require('../bignumber');

    function assert(expected, actual) {
        total++;
        if (expected !== actual) {
           error('\n Test number: ' + total + ' failed');
           error(' Expected: ' + expected);
           error(' Actual:   ' + actual);
           //process.exit();
        }
        else {
            passed++;
            //log('\n Expected and actual: ' + actual);
        }
    }
    
    function T(expected, value) {
        assert(String(expected), new BigNumber(String(value)).floor().toString());
    }

    log('\n Testing floor...');

    BigNumber.config({
        DECIMAL_PLACES : 20,
        ROUNDING_MODE : 4,
        ERRORS : true,
        RANGE : 1E9,
        EXPONENTIAL_AT : 1E9
    });

    T('-2075365', '-2075364.364286541923');
    T('60593539780450631', '60593539780450631');
    T('65937898671515', '65937898671515');
    T('-39719494751819198566799', '-39719494751819198566798.578');
    T('92627382695288166556', '92627382695288166556.8683774524284866028260448205069');
    T('-881574', '-881574');
    T('-3633239210', '-3633239209.654526163275621746013315304191073405508491056');
    T('-23970335459820625362', '-23970335459820625362');
    T('131869457416154038', '131869457416154038');
    T('-2685', '-2685');
    T('-4542227861', '-4542227860.9511298545226');
    T('2416872281', '2416872281.963955669484225137349193306323379254936827');
    T('-757684868752087594264588207656', '-757684868752087594264588207655.27838048392835556');
    T('-438798503527', '-438798503526.2317623894721299587561697');
    T('801625782231888715214665', '801625782231888715214665');
    T('-91881984778675238', '-91881984778675238');
    T('327765350218284325239839632046', '327765350218284325239839632046.91682741746683081459605386');
    T('-7469045007691432295', '-7469045007691432294.362757245');
    T('8365540212937142194319515218789', '8365540212937142194319515218789.4106658678537421977827');
    T('-14109', '-14108.495051214515');
    T('49104501', '49104501.10055989379655329194309526150310568683504206945625');
    T('131370406', '131370406.330005158136313262837556068534122953');
    T('3017', '3017');
    T('-690', '-689.6944252229740521128820354989299283');
    T('73441822178', '73441822178.572653');
    T('-2330', '-2329.42655772223486531483602927572548264457');
    T('-834103872107533086', '-834103872107533086');
    T('-1501493189970436', '-1501493189970435.74866616700317');
    T('70591', '70591.2244675522123484658978887');
    T('4446128540401735117', '4446128540401735117.435836700611264749985822486641350492901');
    T('-597273', '-597273');
    T('729117', '729117');
    T('504', '504');
    T('4803729546823170064608098091', '4803729546823170064608098091');
    T('24147026285420507467578', '24147026285420507467578');
    T('-6581532150677269472830', '-6581532150677269472829.38194951340848938896000325718062365494');
    T('-131279182164804752', '-131279182164804751.430589952021038264');
    T('2949426983040959', '2949426983040959.8911208825380208568451907');
    T('25166', '25166.125888418871654557352055849116604612621573251770362');
    T('4560569286495', '4560569286495.98300685103599898554605198');
    T('13', '13.763105480576616251068323541559825687');
    T('176037174185746614410406167887', '176037174185746614410406167887.42317518');
    T('9050999219306', '9050999219306.7846946346757664893036971777');
    T('39900924', '39900924');
    T('115911043168452445', '115911043168452445');
    T('20962819101135667464733349383', '20962819101135667464733349383.8959025798517496777183');
    T('4125789711001606948191', '4125789711001606948191.4707575965791242737346836');
    T('-6935502', '-6935501.294727166142750626019282');
    T('-2', '-1.518418076611593764852321765899');
    T('-35416', '-35416');
    T('6912783515683955988122411164548', '6912783515683955988122411164548.393');
    T('657', '657.0353902852');
    T('0', '0.0009');
    T('0', '0.00000000000000000000000017921822306362413915');
    T('1483059355427939255846407887', '1483059355427939255846407887.011361095342689876');
    T('7722', '7722');
    T('0', '0.00000005');
    T('8551283060956479352', '8551283060956479352.5707396');
    T('0', '0.000000000000000000000000019904267');
    T('321978830777554620127500539', '321978830777554620127500539.339278568133088682532238002577');
    T('2073', '2073.532654804291079327244387978249477171032485250998396');
    T('677676305591', '677676305591.2');
    T('0', '0.0000000000006');
    T('39181479479778357', '39181479479778357');
    T('0', '0.00000000000000000087964700066672916651');
    T('896', '896');
    T('115083055948552475', '115083055948552475');
    T('9105942082143427451223', '9105942082143427451223');
    T('0', '0.0000000000000009');
    T('0', '0.00000000000000000000004');
    T('0', '0.000250427721966583680168028884692015623739');
    T('0', '0.000000000001585613219016120158734661293405081934');
    T('0', '0.00009');
    T('0', '0.000000090358252973411013592234');
    T('276312604693909858427', '276312604693909858427.21965306055697011390137926559');
    T('0', '0.0000252');

    // ---------------------------------------------------------------- v8 start

    T(0, 0);
    T(0, '0.000');
    T(-0, -0);
    T(Infinity, Infinity);
    T(-Infinity, -Infinity);
    T(NaN, NaN);

    T(0, 0.1);
    T(0, 0.49999999999999994);
    T(0, 0.5);
    T(0, 0.7);
    T(-1, -0.1);
    T(-1, -0.49999999999999994);
    T(-1, -0.5);
    T(-1, -0.7);
    T(1, 1);
    T(1, 1.1);
    T(1, 1.5);
    T(1, 1.7);
    T(-1, -1);
    T(-2, -1.1);
    T(-2, -1.5);
    T(-2, -1.7);

    BigNumber.config({EXPONENTIAL_AT : 100});

    T(-1, -1e-308);
    T(-1e308, -1e308);
    T('2.1e+308', '2.1e308');
    T(-1, '-1e-999');
    T(0, '1e-999');

    T(0, Number.MIN_VALUE);
    T(-1, -Number.MIN_VALUE);
    T(Number.MAX_VALUE, Number.MAX_VALUE);
    T(-Number.MAX_VALUE, -Number.MAX_VALUE);
    T(Infinity, Infinity);
    T(-Infinity, -Infinity);

    var two_30 = 1 << 30;

    T(two_30, two_30);
    T(two_30, two_30 + 0.1);
    T(two_30, two_30 + 0.5);
    T(two_30, two_30 + 0.7);

    T(two_30 - 1, two_30 - 1);
    T(two_30 - 1, two_30 - 1 + 0.1);
    T(two_30 - 1, two_30 - 1 + 0.5);
    T(two_30 - 1, two_30 - 1 + 0.7);

    T(-two_30, -two_30);
    T(-two_30, -two_30 + 0.1);
    T(-two_30, -two_30 + 0.5);
    T(-two_30, -two_30 + 0.7);

    T(-two_30 + 1, -two_30 + 1);
    T(-two_30 + 1, -two_30 + 1 + 0.1);
    T(-two_30 + 1, -two_30 + 1 + 0.5);
    T(-two_30 + 1, -two_30 + 1 + 0.7);

    var two_52 = (1 << 30) * (1 << 22);

    T(two_52, two_52);
    T(two_52, two_52 + 0.1);
    T(two_52, two_52 + 0.5);
    T(two_52 + 1, two_52 + 0.7);

    T(two_52 - 1, two_52 - 1);
    T(two_52 - 1, two_52 - 1 + 0.1);
    T(two_52 - 1, two_52 - 1 + 0.5);
    T(two_52 - 1, two_52 - 1 + 0.7);

    T(-two_52, -two_52);
    T(-two_52, -two_52 + 0.1);
    T(-two_52, -two_52 + 0.5);
    T(-two_52, -two_52 + 0.7);

    T(-two_52 + 1, -two_52 + 1);
    T(-two_52 + 1, -two_52 + 1 + 0.1);
    T(-two_52 + 1, -two_52 + 1 + 0.5);
    T(-two_52 + 1, -two_52 + 1 + 0.7);

    // ------------------------------------------------------------------ v8 end

    assert('1', new BigNumber('1.9999999999').floor(NaN).toString());

    log('\n ' + passed + ' of ' + total + ' tests passed in ' + (+new Date() - start) + ' ms \n');
    return [passed, total];;
})(this.BigNumber);
if (typeof module !== 'undefined' && module.exports) module.exports = count;