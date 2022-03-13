<?php
    require_once "connect.php";
    session_start();
    if(!isset($_SESSION['logged']))
    {
        header('Location: login.php'); 
    }
    if(isset($_POST['logout']))
    {
        unset($_SESSION['logged']);
        unset($_SESSION['user_id']);
        unset($_SESSION['nick']);
        unset($_SESSION['email']);
        unset($_SESSION['password']);
        unset($_SESSION['profile_img']);
        header('Location: index.php');
    }
    else
    {
        try
        {
            $connect = new mysqli($host,$db_user,$db_password,$db_name);
            if($connect->connect_errno!=0)
            {
                throw new Exception(mysqli_connect_errno());
            }
            else
            {
                $resultGames = $connect->query("SELECT g.game_src,g.title,g.preview FROM favourite_games as f INNER JOIN games as g ON f.game_id = g.game_id WHERE f.users_id =".$_SESSION['user_id']);
                if(!$resultGames)
                {
                    throw new Exception($connect->error);
                }
            }
            if(isset($_POST["submit"])) 
            {
                $tmp_name = $_FILES["plik"]["tmp_name"];
                $name = basename($_FILES["plik"]["name"]);
                $ext = $_FILES["plik"]["type"];
                if(@$ext == 'image/gif' || @$ext == 'image/png' || @$ext == 'image/jpeg' || @$ext == 'image/webp' || @$ext=='image/jpg') {
                    move_uploaded_file($tmp_name, "resources/profiles/".$_SESSION['user_id'].'.png');
                    $_SESSION['profile_img'] = 'resources/profiles/'.$_SESSION['user_id'].'.png';
                    $connect->query('UPDATE users SET profile_img="'.$_SESSION['profile_img'].'" WHERE user_id='.$_SESSION['user_id']);
                }
                else
                {
                    $_SESSION['e_file'] = 'Nie wybrano pliku lub format pliku jest nie prawidłowy';
                }
            }
            $connect->close();
        }
        catch(Exception $e)
        {
            $_SESSION['iserror'] = "error";
            $_SESSION['error'] = '<div style="font-size: 18px; text-align:center;">Informacja deweloperska:'.$e.'</div>';
            header('Location: error.php');
        }
    }  
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="#">
    <link href="style.css" rel="stylesheet">
    <link href="profile.css" rel="stylesheet">
    <title>Sky Games: Profil</title>
</head>
<body>
    <header>
        <a href="index.php"><div id="header-logo">Sky Games</div></a>
        <a id="button-profile" class="buttons" href="profile.php" ><img src="<?php if(isset($_SESSION['profile_img'])) {echo $_SESSION['profile_img'];} else {echo 'resources/profile.png';} ?>"></a>
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
        ?>
        </div>
        <a id="button-cloud" class="buttons"><img id ="imgcloud" src="https://i.ibb.co/PQQh00P/cloud.png"></a>
    </header>
    <div class="cloudON" id="div-cloud">
        <section>
            <article id="main">
                <form method="post">
                    <input type="submit" id="logout" value="Wyloguj" name="logout">
                </form>
                <div id="profile-div-main">
                    <div id="profile-div"><img id="profile-img" src="<?php echo $_SESSION['profile_img']; ?>"></div>
                    <form enctype="multipart/form-data" method="post" id="file-form">
                        <input type="file" name="plik" accept="image/png, image/jpeg, image/webp, image/gif">
                        <?php 
                        if(isset($_SESSION['e_file']))
                        {
                            echo '<div id="e_file">'.$_SESSION['e_file'].'</div>';
                            unset($_SESSION['e_file']);
                        }
                        ?>
                        <br>
                        <input type="submit" name="submit" value="Potwierdź">
                    </form>
                </div>
                <div id="profile-info-main">
                    <div class="profile-info">Nazwa gracza: <?php
                        echo '<span id="span-info">'.$_SESSION['nick'].'</span>';
                    ?></div>
                    <div class="profile-info">e-mail:<?php
                        echo '<span id="span-info">'.$_SESSION['email'].'</span>';
                    ?></div>
                </div>
            </article>
            <article>
                <div id="favourite-div">
                    <div id="favourite-title">Ulubione:</div>
                    <?php
                    if($resultGames->num_rows!=0)
                    {
                        echo '<ul class="game-ul">';
                        while($row = $resultGames->fetch_assoc())
                        {
                            echo '<li><a href='. $row["game_src"] .'><div class="game-img"><img src='.$row["preview"].'></div><div class="game-title">'.$row['title'].'</div></a></li>';
                        }
                        echo '</ul>';
                    }
                    else
                    {
                        echo '<span id="span-fav">Brak gier w ulubionych</span>';
                    }
                    ?>
                </div>
            </article>
        </section>
    </div>
    <footer>
        <div id="creators">
            Strona wykonana przez: Wojciech Lichtoń
        </div>
    </footer> 
    <script src="script.js"></script>
</body>
</html>