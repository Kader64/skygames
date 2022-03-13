<?php
    require_once "connect.php";
    session_start();
    try
    {
        $connect = new mysqli($host,$db_user,$db_password,$db_name);
        if($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {
            $resultNewGames = $connect->query("SELECT game_src,title,preview,rating FROM games ORDER BY addTime DESC LIMIT 5");
            if(!$resultNewGames)
            {
                throw new Exception($connect->error);
            }
            $resultTopGames = $connect->query("SELECT game_src,title,preview,rating FROM games ORDER BY rating DESC LIMIT 5");
            if(!$resultTopGames)
            {
                throw new Exception(mysqli_error($connect));
            }
            $resultAllGames = $connect->query("SELECT game_src,title,preview,rating FROM games");
            if(!$resultAllGames)
            {
                throw new Exception($connect->error);
            }
            if(isset($_GET['search']))
            {
                $search = $connect->real_escape_string($_GET['search']);
                $query = "SELECT game_src,title,preview,rating FROM games WHERE title LIKE '%$search%'";
                $resultSearch = $connect->query($query);
                if(!$resultSearch)
                {
                    throw new Exception($connect->error);
                }
            }
        $connect->close();
        }
    }
    catch(Exception $e)
    {
        $_SESSION['iserror'] = "error";
        $_SESSION['error'] = '<div style="font-size: 18px; text-align:center;">Informacja deweloperska:'.$e.'</div>';
        header('Location: error.php');
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
    <title>Sky Games</title>
</head>
<body>
    <header id="main-page">
        <a href="index.php"><div id="header-logo">Sky Games</div></a>
        <a id="button-profile" class="buttons" href="login.php"><img src="<?php if(isset($_SESSION['profile_img'])) {echo $_SESSION['profile_img'];} else {echo 'resources/profile.png';} ?>"></a>
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
        <a id="button-search" class="buttons"><img src="resources/search.png"></a>
        <form method="get" id="form">
            <input type="text" name="search" id="form-search" class="searchOFF" placeholder="Wyszukiwanie">
        </form>
    </header>
    <div class="cloudON" id="div-cloud">
        <section id="section-main">
            <article class="games">
                <?php
                if(isset($_GET['search']))
                {
                    $search = htmlspecialchars($_GET['search']);
                    if($resultSearch->num_rows==0)
                    {
                        echo '<span class="search-results">Brak wyników dla: "'.$search.'"</span>';
                    }
                    else
                    {
                        echo '<span class="search-results">Wyszukane wyniki dla: "'.$search.'"</span>';
                    }
                    echo '<ul class="game-ul">';
                    while($row0 = $resultSearch->fetch_assoc())
                    {
                        echo '<li><a href='. $row0["game_src"] .'><div class="game-img"><img src='.$row0["preview"].'></div><div class="game-title">'.$row0['title'].'</div></a></li>';
                    } 
                    echo '</ul>';
                    echo '<hr>';
                }
                ?>
            </article>
            <article class="games">
                <div class="game-category-name">Najnowsze:</div>
                <ul class="game-ul">
                    <?php
                        while($row1 = $resultNewGames->fetch_assoc())
                        {
                            echo '<li><a href='. $row1["game_src"] .'><div class="game-img"><img src='.$row1["preview"].'></div><div class="game-title">'.$row1['title'].'</div></a></li>';
                        } 
                    ?>
                </ul>
            </article>
            <hr>
            <article class="games">
            <div class="game-category-name">Najlepiej oceniane:</div>
            <ul class="game-ul">
                    <?php
                        while($row2 = $resultTopGames->fetch_assoc())
                        {
                            echo '<li><a href='. $row2["game_src"] .'><div class="game-img"><img src='.$row2["preview"].'></div><div class="game-title">'.$row2['title'].'</div></a></li>';
                        } 
                    ?>
                </ul>
            </article>
            <hr>
            <article class="games">
            <div class="game-category-name">Wszystkie:</div>
            <ul class="game-ul">
                    <?php
                        while($row3 = $resultAllGames->fetch_assoc())
                        {
                            echo '<li><a href='. $row3["game_src"] .'><div class="game-img"><img src='.$row3["preview"].'></div><div class="game-title">'.$row3['title'].'</div></a></li>';
                        } 
                    ?>
                </ul>
            </article>
        </section>
    </div>
    <footer>
        <div id="creators">
            Strona wykonana przez: Wojciech Lichtoń
        </div>
    </footer>
    <script>
        const btnSearch = document.querySelector("#button-search")
        var formSearch = document.querySelector("#form-search")
        btnSearch.addEventListener("click",function(){
            if(formSearch.className=="searchOFF")
            {
                formSearch.className = "searchON"
            }
            else
            {
                formSearch.className = "searchOFF"
                if(form[0].value != "")
                {
                    form.submit()
                }
            }
        })
    </script>
    <script src="script.js"></script>
</body>
</html>