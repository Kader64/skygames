<?php
    session_start();
    if(isset($_SESSION['iserror']))
    {
        echo '<div style="color: red; font-size: 30px; text-align:center;"><br>Błąd serwera! Przepraszamy za problemy. Spróbuj ponowanie później. <br><br></div>';
        echo $_SESSION["error"];
        unset($_SESSION["error"]);
        unset($_SESSION["iserror"]);
    }
    else
    {
        header('Location: index.php');
    }
?>