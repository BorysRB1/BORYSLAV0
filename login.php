<?php

include 'boryslav0.php';

// Підключення до бази даних
$conn = new mysqli($servername, $username, $password, $dbname);

// Перевірка підключення
if ($conn->connect_error) {
    die("Помилка підключення: " . $conn->connect_error);
}

// Отримання даних з форми
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Перевірка користувача
    $sql = "SELECT * FROM users WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo "<script>
                alert('Успішна авторизація!');
                window.location.href = 'boryslav0.html';
            </script>";
            exit();
        } else {
            echo "<script>
                alert('Неправильний пароль');
                window.history.back();
            </script>";
        }
    } else {
        echo "<script>
            alert('Користувача з таким email не знайдено');
            window.history.back();
        </script>";
    }

    $stmt->close();
}

$conn->close();
?>
