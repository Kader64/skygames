<?php
    require_once "../../connect.php";
    session_start();
    $_SESSION['gameID'] = 2;
    try
    {
        $connect = new mysqli($host,$db_user,$db_password,$db_name);
        if($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {
            $countVotes = $connect->query("SELECT rating_id FROM rating WHERE game_id=".$_SESSION['gameID']) OR throw new Exception($connect->error);
            $countVotes = $countVotes->num_rows;
            $rating = $connect->query("SELECT rating FROM games WHERE game_id=".$_SESSION['gameID']) OR throw new Exception($connect->error);
            $rating = $rating->fetch_assoc();
            $rating = (int) $rating['rating'];
            $connect->close();
        }
    }
    catch(Exception $e)
    {
        $_SESSION['iserror'] = "error";
        $_SESSION['error'] = '<div style="font-size: 18px; text-align:center;">Informacja deweloperska:'.$e.'</div>';
        header('Location: ../../error.php');
    }
?>


<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../../style.css" rel="stylesheet">
    <link href="../games.css" rel="stylesheet">
    <title>Sky Games - Chess</title>
</head>
<body>
    <header>
        <a href="../../index.php"><div id="header-logo">Sky Games</div></a>
        <a id="button-profile" class="buttons" href="../../login.php"><img src="<?php if(isset($_SESSION['profile_img'])) {echo '../../'.$_SESSION['profile_img'];} else {echo '../../resources/profile.png';} ?>"></a>
        <div id="user-name">
        <?php 
            if(isset($_SESSION['logged']))
            {
                echo $_SESSION['nick'];
            }
            else
            {
                echo 'Guest';
            }
        ?></div>
        <a id="button-cloud" class="buttons"><img id ="imgcloud" src="https://i.ibb.co/PQQh00P/cloud.png"></a>
        <div id="slide-down" class="hide"></div>
    </header>
    <div class="cloudON" id="div-cloud">
        <section>
            <article>
                <div id="main-title">
                    <div id="title">Chess</div>
                    <div id="addFavourite"><img src="../../resources/heart.png"></div>
                    <div id="likes">
                        <div id="like"><img src="../../resources/like.png" ></div>
                        <div id="dislike"><img src="../../resources/like.png" ></div>
                    </div>
                    <div id="rating">
                    <?php
                        for($i=0;$i<100;$i+=20)
                        {
                            if($i<$rating)
                            {
                                if($i+20>$rating && $i-10<$rating)
                                {
                                    echo '<div class="stars"><img src="../../resources/starhalf.png"></div>';
                                }
                                else
                                {
                                    echo '<div class="stars"><img src="../../resources/star.png"></div>';
                                }
                            }
                            else
                            {
                                echo '<div class="stars"><img src="../../resources/starempty.png"></div>';
                            }
                        }
                    ?>
                    <br>
                    Głosów: 
                    <?php
                        
                        echo $countVotes;
                    ?>
                    </div>
                </div>
                <div id="game-container">
                    <canvas id="canvasGame">Tu jest canvas</canvas>
                </div>
                <div id="creator">
                    Autor: Wojciech Lichtoń
                </div>
            </article>
        </section>
    </div>
    <footer>
        <div id="creators">
            Strona wykonana przez: Wojciech Lichtoń
        </div>
    </footer>
    <script src="../../script.js"></script>
    <script src="../games.js"></script>
    <script src="chess.js"></script>
    <script src="pieces.js"></script>
</body>
</html>
