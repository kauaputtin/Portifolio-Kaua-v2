# Configuração do Formulário de Contato

## Como funciona

O formulário agora envia emails reais usando um arquivo PHP (`send-email.php`) que processa as mensagens e as envia para o seu email.

## Passo 1: Configurar seu email

Abra o arquivo `send-email.php` e substitua this linha:

```php
$destinatario = "seu-email@exemplo.com"; // SUBSTITUA PELO SEU EMAIL
```

Coloque seu email real. Exemplo:

```php
$destinatario = "kaua@example.com";
```

## Passo 2: Testar o formulário

1. Seu servidor web deve ter PHP habilitado (a maioria dos servidores compartilhados tem)
2. Abra o site no navegador
3. Preencha o formulário e clique em "Enviar mensagem"
4. Você receberá um email com a mensagem

## Casos de uso

- **Localhost/Desenvolvimento**: O PHP precisa estar instalado
- **Hospedagem compartilhada**: Geralmente funciona automaticamente
- **Servidor próprio**: Certifique-se de que PHP `mail()` está configurado

## Notas

- O email do remetente será o email fornecido pelo visitante
- O formulário faz validações básicas de segurança
- Se receber erro, verifique se PHP está habilitado no servidor
