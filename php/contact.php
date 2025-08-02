<?php
// Konfigurasi koneksi database
$servername = "localhost"; // default
$username = "root"; // default
$password = ""; // default password untuk root di Laragon
$dbname = "contact_form"; // nama database yang sudah kamu buat

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Memeriksa apakah form sudah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Menyiapkan SQL query untuk memasukkan data ke tabel messages
    $sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$message')";

    // Mengeksekusi query
    if ($conn->query($sql) === TRUE) {
        // Mengirim email
        $to = "fazaanggapr@gmail.com"; // Ganti dengan email tujuan
        $subject = "Pesan Baru dari Kontak Website";
        $body = "Nama: $name\nEmail: $email\n\nPesan:\n$message";
        $headers = "From: $email" . "\r\n" . "Reply-To: $email" . "\r\n" . "Content-type: text/plain; charset=UTF-8";

        // Kirim email
        if (mail($to, $subject, $body, $headers)) {
            echo "Pesan berhasil dikirim dan disimpan!";
        } else {
            echo "Terjadi kesalahan saat mengirim email.";
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Menutup koneksi
    $conn->close();
}
?>
