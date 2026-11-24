<?php

$conn = mysqli_connect("localhost", "root", "retro", "groove");
if ($conn) {
    //echo "Alright, finally the database is connected";
}
else {
    echo "Oh man, the database still did not connect";
}

?>
