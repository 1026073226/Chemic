<?php
$hp1 = 0;
$hp2 = 0;
$modVar = json_decode(file_get_contents("data/var.txt"), true) ?? [];
$maxp1 = (int)file_get_contents("data/m1.txt") ?? 1;
$maxp2 = (int)file_get_contents("data/m2.txt") ?? 1;
$hp1f = (int)file_get_contents("data/h1.txt") ?? 0;
$hp2f = (int)file_get_contents("data/h2.txt") ?? 0;
$p1e = (int)file_get_contents("data/e1.txt") ?? 0;
$p2e = (int)file_get_contents("data/e2.txt") ?? 0;
if ($hp1f != 0) {
  $hp1 = $hp1f;
}
if ($hp2f != 0) {
  $hp2 = $hp2f;
}
http_response_code(200);
header("Access-Control-Allow-Origin: *");
class msg {
  public $ht1;
  public $ht2;
  public $maxp1;
  public $maxp2;
  public $p1e;
  public $p2e;
  public $modVar;
  public function __construct($ht1, $ht2, $maxp1, $maxp2, $p1e, $p2e, $modVar) {
    $this->ht1 = $ht1;
    $this->ht2 = $ht2;
    $this->maxp1 = $maxp1;
    $this->maxp2 = $maxp2;
    $this->p1e = $p1e;
    $this->p2e = $p2e;
    $this->modVar = $modVar;
  }
}
if (isset($_GET["next"])) {
  $GLOBALS[$_GET["next"]."e"] = $_GET["r"];
}
if (isset($_GET["var"])) {
  $modVar[$_GET["var"]] = $_GET["value"];
}
if(isset($_GET["key"])) {
  echo $modVar[$_GET["key"]];
}
if (isset($_GET["test"])) {
  $testValue = $_GET["test"];
  echo $testValue;
} else if (isset($_GET["h1"])) {
  $h1 = $_GET["h1"];
  $h2 = $_GET["h2"];
  $p = $_GET["p"];
  $max = $_GET["max"];
  if ($p == "p1") {
    $hp1 -= $h1;
    $hp2 += $h2;
  } else {
    $hp2 -= $h1;
    $hp1 += $h2;
  }
  $GLOBALS["max".$p] = $max;
  echo json_encode(new msg($hp1, $hp2, $maxp1, $maxp2, $p1e, $p2e, $modVar));
} else if (isset($_GET["msg"])) {
  echo json_encode(new msg($hp1, $hp2, $maxp1, $maxp2, $p1e, $p2e, $modVar));
}
if (isset($_GET["reset"])) {
  $hp1 = 0;
  $hp2 = 0;
  $maxp1 = 100;
  $maxp2 = 100;
  $p1e = 0;
  $p2e = 0;
  $modVar = [];
}
file_put_contents("data/h1.txt", $hp1);
file_put_contents("data/h2.txt", $hp2);
file_put_contents("data/m1.txt", $maxp1);
file_put_contents("data/m2.txt", $maxp2);
file_put_contents("data/e1.txt", $p1e);
file_put_contents("data/e2.txt", $p2e);
file_put_contents("data/var.txt", json_encode($modVar));
?>