<?php
require "./connect.php";
$result = $db->query("select * from DONOR");
while($r = $result->fetch_assoc()){
  $o[] = $r;
}
echo json_encode($o,TRUE);
 ?>
