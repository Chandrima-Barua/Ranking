<?php
################
# DEPENDENCIES #
################
require_once __DIR__ . '/' . 'Db/Reader.php';
require_once __DIR__ . '/' . 'Db/Reader/Decoder.php';
require_once __DIR__ . '/' . 'Db/Reader/InvalidDatabaseException.php';
require_once __DIR__ . '/' . 'Db/Reader/Metadata.php';
require_once __DIR__ . '/' . 'Db/Reader/Util.php';     // new 2014/09
use MaxMind\Db\Reader;

#############
# DATABASES #
#############
$city_mmdb = 'GeoIP2-City.mmdb';
$country_mmdb = 'GeoLite2-Country.mmdb';
$isp_mmdb = 'GeoIP2-ISP.mmdb';

#############
# DATABASES #
#############
$city_reader = new Reader( __DIR__  . '/' . $city_mmdb );
$country_reader = new Reader( __DIR__  . '/' . $country_mmdb );
$isp_reader = new Reader( __DIR__  . '/' . $isp_mmdb );

########
# TEST #
########
echo "<pre>";
echo "CITY:<br>";
print_r($city_reader->get('103.5.233.226'));
echo "COUNTRY:<br>";
print_r($country_reader->get('103.5.233.226'));
echo "ISP:<br>";
print_r($isp_reader->get('103.5.233.226'));
echo "</pre>";

//require_once '../vendor/autoload.php';
//use MaxMind\Db\Reader;
//$reader = new Reader('GeoIP2-City.mmdb');


//$count = 10000;
//$startTime = microtime(true);
//for ($i = 0; $i < $count; $i++) {
//    $ip = long2ip(rand(0, pow(2, 32) -1));
//    $t = $reader->get($ip);
//    if ($i % 1000 == 0) {
//        print($i . ' ' . $ip . "\n");
//        // print_r($t);
//    }
//}
//$endTime = microtime(true);
//$duration = $endTime - $startTime;
//print('Requests per second: ' . $count / $duration . "\n");
?>