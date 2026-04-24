<?php
header('Content-Type: application/json; charset=utf-8');

// Configuração de email
$destinatario = "kauaputtin@gmail.com"; // SUBSTITUA PELO SEU EMAIL

// Recebe os dados do formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $assunto = isset($_POST['subject']) ? trim($_POST['subject']) : 'Sem assunto';
    $mensagem = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validações básicas
    if (empty($nome) || empty($email) || empty($mensagem)) {
        http_response_code(400);
        echo json_encode(['sucesso' => false, 'erro' => 'Campos obrigatórios não preenchidos'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['sucesso' => false, 'erro' => 'Email inválido'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Sanitiza inputs
    $nome = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $assunto = htmlspecialchars($assunto, ENT_QUOTES, 'UTF-8');
    $mensagem = htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8');

    // Monta o email
    $assunto_email = "Novo contato do portfólio: " . $assunto;
    $corpo_email = "Nome: $nome\n";
    $corpo_email .= "Email: $email\n";
    $corpo_email .= "Assunto: $assunto\n\n";
    $corpo_email .= "Mensagem:\n$mensagem";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Tenta enviar o email
    if (mail($destinatario, $assunto_email, $corpo_email, $headers)) {
        http_response_code(200);
        echo json_encode(['sucesso' => true, 'mensagem' => 'Email enviado com sucesso!'], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        echo json_encode(['sucesso' => false, 'erro' => 'Erro ao enviar o email'], JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(405);
    echo json_encode(['sucesso' => false, 'erro' => 'Método não permitido'], JSON_UNESCAPED_UNICODE);
}