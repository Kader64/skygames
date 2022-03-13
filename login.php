<?php
    session_start();
    if(isset($_SESSION['logged']))
    {
        header('Location: profile.php');
    }

    if(isset($_POST['password']))
    {
        require_once "connect.php";
        try
        {
            $connect = new mysqli($host,$db_user,$db_password,$db_name);
            if($connect->connect_errno!=0)
            {
                throw new Exception($connect->error);
            }
            if($results = $connect->query(
                sprintf("SELECT * FROM users WHERE nick = '%s'",
                mysqli_real_escape_string($connect,$_POST['login']))))
                {
                    if($results->num_rows>0)
                    {
                        $row = $results->fetch_assoc();
                        if(password_verify($_POST["password"],$row['password']))
                        {
                            $_SESSION['logged'] = true;
                            $_SESSION['user_id'] = $row['user_id'];
                            $_SESSION['nick'] = $row['nick'];
                            $_SESSION['email'] = $row['email'];
                            $_SESSION['password'] = $row['password'];
                            $_SESSION['profile_img'] = $row['profile_img'];
            
                            unset($_SESSION['log_error']);
                            $results->free();
                            header('Location: index.php');
                        }
                        else
                        {
                            $_SESSION['log_error'] = '<div class="error">Nieprawidłowy login lub hasło!</div>';
                        }
                    }
                    else
                    {
                        $_SESSION['log_error'] = '<div class="error">Nieprawidłowy login lub hasło!</div>';
                    }
                }
            $connect->close();
        }
        catch(Exception $e)
        {
            $_SESSION['iserror'] = "error";
            $_SESSION['error'] = '<div style="font-size: 25px; text-align:center;>Informacja deweloperska: </div>'.$e;
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
    <link href="Reg-Log.css" rel="stylesheet">
    <title>Sky Games - Logowanie</title>
    </head>
<body>
    <header>
        <a href="index.php"><div id="header-logo">Sky Games</div></a>
        <a id="button-cloud" class="buttons"><img id ="imgcloud" src="https://i.ibb.co/PQQh00P/cloud.png"></a>
    </header>
    <div class="cloudON" id="div-cloud">
        <section>
            <div id="title">Logowanie</div>
            <form method="post">
                Login:<br><input type="text" name="login" placeholder=" Login"><br>
                Hasło:<br><input type="password" name="password" placeholder=" Hasło"><br>
                <?php
                    if(isset($_SESSION['log_error']))
                    {
                        echo $_SESSION['log_error'];
                        unset($_SESSION['log_error']);
                    }
                ?>
                <input type="submit" value="Zaloguj się">
            </form>
            <a href="registration.php"><div id="reg-log">Nie masz konto? Zarejestruj się</div></a>
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