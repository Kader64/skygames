<?php
    require_once "../connect.php";
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
            if(isset($_GET['l']))
            {
                if(isset($_SESSION['logged']))
                {
                    $rating = $connect->query("SELECT rating_id FROM rating WHERE game_id=".$_SESSION['gameID']." AND user_id=".$_SESSION["user_id"]);
                    if(!$rating)
                    {
                        throw new Exception($connect->error);
                    }
                    if($_GET['l']=="like")
                    {
                        if($rating->num_rows==0)
                        {
                            echo 'Dziękujemy za ocenę gry.';
                            $connect->query("INSERT INTO rating(game_id,user_id,rate_type) VALUES(".$_SESSION['gameID'].",".$_SESSION["user_id"].",1)");
                        }
                        else
                        {
                            echo 'Zmieniono ocenę gry.<br>(pozytywna)';
                            $connect->query("UPDATE rating SET rate_type=1 WHERE game_id=".$_SESSION['gameID']." AND user_id=".$_SESSION["user_id"]);
                        }
                    }
                    else if($_GET['l']=="dislike")
                    {
                        if($rating->num_rows==0)
                        {
                            echo 'Dziękujemy za ocenę gry.';
                            $connect->query("INSERT INTO rating(game_id,user_id,rate_type) VALUES(".$_SESSION['gameID'].",".$_SESSION["user_id"].",0)");
                        }
                        else
                        {
                            echo 'Zmieniono ocenę gry.<br>(negatywna)';
                            $connect->query("UPDATE rating SET rate_type=0 WHERE game_id=".$_SESSION['gameID']." AND user_id=".$_SESSION["user_id"]);
                        }
                    }
                    if($_GET['l']=='fav')
                    {
                        $results = $connect->query("SELECT game_id FROM favourite_games WHERE game_id=".$_SESSION['gameID']." AND users_id=".$_SESSION["user_id"]);
                        if(!$results)
                        {
                            throw new Exception($connect->error);
                        }
                        if($results->num_rows==0)
                        {
                            echo 'Gra dodana do ulubionych.';
                            $connect->query("INSERT INTO favourite_games(game_id,users_id) VALUES(".$_SESSION['gameID'].",".$_SESSION["user_id"].")");
                        }
                        else
                        {
                            echo 'Gra usunięta z ulubionych.';
                            $connect->query("DELETE FROM favourite_games WHERE game_id=".$_SESSION['gameID']." AND users_id=".$_SESSION['user_id']);
                        }
                    }
                    $allVotes = $connect->query("SELECT rating_id FROM rating WHERE game_id=".$_SESSION['gameID']) OR throw new Exception($connect->error);
                    $onlyLikes = $connect->query('SELECT rating_id FROM rating WHERE rate_type=1 AND game_id ='.$_SESSION['gameID'] ) OR throw new Exception($connect->error);
                    
                    $countVotes = $allVotes->num_rows;
                    $countLikes = $onlyLikes->num_rows;

                    if($countVotes!=0 && $countLikes!=0)
                    {
                        $rating= $countLikes/$countVotes*100;
                        $connect->query('UPDATE games SET rating='.$rating.' WHERE game_id='.$_SESSION['gameID']);
                    }
                    else
                    {
                        $connect->query('UPDATE games SET rating= 0 WHERE game_id='.$_SESSION['gameID']);
                    }
                }
                else
                {
                    echo 'Zaloguj się, aby korzystać z tej opcji.';
                }
            }
            else
            {
                header('Location: ../index.php');
            }
            $connect->close();
        }
    }
    catch(Exception $e)
    {
        $_SESSION['iserror'] = "error";
        $_SESSION['error'] = '<div style="font-size: 18px; text-align:center;">Informacja deweloperska:'.$e.'</div>';
        header('Location: ../error.php');
    }
?>