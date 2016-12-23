<?php
include_once "Mobile_Detect.php";

$os = new Mobile_Detect();

    if(!$os->isMobile()) {
        include "index_.html";
    } else {
        include "mob.html";
    }