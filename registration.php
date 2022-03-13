<?php 
    session_start();
    if(isset($_SESSION['logged']))
    {
        header('Location: index.php');
    }

    if(isset($_POST['email']))
    {
        $successful = true;
        $nick = $_POST['nick'];

        if((strlen($nick)<3) || (strlen($nick)>20))
        {
            $successful = false;
            $_SESSION['e_nick'] = "Nick musi posiadać od 3 do 20 znaków.";
        }

        if(ctype_alnum($nick) == false)
        {
            $successful = false;
            $_SESSION['e_nick'] = "Nick może składać się tylko z liter i cyfr (bez polskich znaków)";
        }

        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        if((filter_var($email, FILTER_VALIDATE_EMAIL)) == false || ($email != $_POST['email']))
        {
            $successful = false;
            $_SESSION['e_email'] = "Podaj poprawy adres e-mail.";
        }

        if((strlen($_POST['password1']) < 8) || (strlen($_POST['password1'] ) > 20 ))
        {
            $successful = false;
            $_SESSION['e_password'] = "Hasło musi posiadać od 8 do 20 znaków.";
        }

        if($_POST['password1'] != $_POST['password2'])
        {
            $successful = false;
            $_SESSION['e_password'] = "Hasła muszą być identyczne.";
        }

        $password_hash = password_hash($_POST["password1"],PASSWORD_DEFAULT);

        if(!isset($_POST["regulamin"]))
        {
            $successful = false;
            $_SESSION['e_regulamin'] = "Potwierdź akceptacje regulaminu.";
        }

        $secret = "6LfCmlAaAAAAAN5TuWuTgk866gh2DV6vdoFsxt1g";
        $check = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);

        if(!json_decode($check)->success)
        {
            $successful = false;
            $_SESSION['e_bot'] = "Potwierdz, że nie jesteś botem :)";
        }

        require_once "connect.php";
        mysqli_report(MYSQLI_REPORT_STRICT);

        try
        {
            $connect = new mysqli($host,$db_user,$db_password,$db_name);
            if($connect->connect_errno!=0)
            {
                throw new Exception(mysqli_connect_errno());
            }
            else
            {
                $rezultat = $connect->query("SELECT user_id FROM users WHERE email='$email'");
                if(!$rezultat)
                {
                    throw new Exception($connect->error);
                }

                if($rezultat->num_rows>0)
                {
                    $successful = false;
                    $_SESSION['e_email'] = "Istnieje już konto przypisane do tego adresu e-mail.";
                }

                $rezultat = $connect->query("SELECT user_id FROM users WHERE nick='$nick'");
                if(!$rezultat)
                {
                    throw new Exception($connect->error);
                }

                if($rezultat->num_rows>0)
                {
                    $successful = false;
                    $_SESSION['e_nick'] = "Istnieje już gracz o takim nicku. Wybierz inny.";
                }
                
                if($successful == true)
                {
                    if($connect->query("INSERT INTO users VALUES (NULL,'$nick','$password_hash','$email','resources/profile.png')"))
                    {
                        header('Location: login.php');
                    }
                    else
                    {
                        throw new Exception($connect->error);
                    }
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
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <link rel="shortcut icon" href="#">
    <link href="style.css" rel="stylesheet">
    <link href="Reg-Log.css" rel="stylesheet">
    <title>Sky Games - Rejestracja</title>
    </head>
<body>
    <header>
        <a href="index.php"><div id="header-logo">Sky Games</div></a>
        <a id="button-cloud" class="buttons"><img id ="imgcloud" src="https://i.ibb.co/PQQh00P/cloud.png"></a>
    </header>
    <div class="cloudON" id="div-cloud">
        <section>
            <div id="title">Rejestracja</div>
            <form method = "post">
                Login:<br><input type="text" name="nick"  placeholder=" Login"><br>
                <?php
                    if(isset($_SESSION['e_nick']))
                    {
                        echo '<div class="error">'.$_SESSION['e_nick'].'</div>';
                        unset($_SESSION['e_nick']);
                    }
                ?>
                e-mail:<br><input type="text" name="email" placeholder=" e-mail"><br>
                <?php
                    if(isset($_SESSION['e_email']))
                    {
                        echo '<div class="error">'.$_SESSION['e_email'].'</div>';
                        unset($_SESSION['e_email']);
                    }
                ?>
                
                Hasło:<br><input type="password" name="password1" placeholder=" Hasło"><br>
                <?php
                    if(isset($_SESSION['e_password']))
                    {
                        echo '<div class="error">'.$_SESSION['e_password'].'</div>';
                        unset($_SESSION['e_password']);
                    }
                ?>
                Potwierdź hasło:<br><input type="password" name="password2" placeholder=" Hasło"><br>
                <?php
                    if(isset($_SESSION['e_password']))
                    {
                        echo '<div class="error">'.$_SESSION['e_password'].'</div>';
                        unset($_SESSION['e_password']);
                    }
                ?>
                <label>
                    <input type="checkbox" name="regulamin">Akceptuję regulamin
                </label>
                <?php
                    if(isset($_SESSION['e_regulamin']))
                    {
                        echo '<div class="error">'.$_SESSION['e_regulamin'].'</div>';
                        unset($_SESSION['e_regulamin']);
                    }
                ?>
                <div class="g-recaptcha" data-sitekey="6LfCmlAaAAAAABbV2M9FP_zzfPWwVYypHaTp-5Qx"></div>
                <?php
                    if(isset($_SESSION['e_bot']))
                    {
                        echo '<div class="error">'.$_SESSION['e_bot'].'</div>';
                        unset($_SESSION['e_bot']);
                    }
                ?>
                <input type="submit" value="Zarejestruj się">
            </form>
            <a href="login.php"><div id="reg-log">Masz już konto? Zaloguj się</div></a>
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