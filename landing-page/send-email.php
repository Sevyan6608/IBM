<?php
/**
 * A1 Bulgaria IBM Landing Page - Email Handler
 * Sends form submissions via SMTP
 */

// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Load environment variables
require_once 'config.env.php';

// Validate required environment variables
if (!defined('SMTP_HOST') || !defined('SMTP_USER') || !defined('SMTP_PASS') || !defined('SMTP_TO')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error']);
    error_log('SMTP configuration missing');
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$required_fields = ['company', 'name', 'phone', 'email', 'service'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required field: ' . $field]);
        exit;
    }
}

// Sanitize input data
$company = filter_var($data['company'], FILTER_SANITIZE_STRING);
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$phone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$service = filter_var($data['service'], FILTER_SANITIZE_STRING);
$timestamp = isset($data['timestamp']) ? $data['timestamp'] : date('Y-m-d H:i:s');

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Rate limiting (simple implementation)
session_start();
$current_time = time();
if (isset($_SESSION['last_submission']) && ($current_time - $_SESSION['last_submission']) < 60) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait before submitting again']);
    exit;
}

// Email content (always in Bulgarian)
$t = [
    'subject' => 'Нова заявка за консултация - IBM решения от A1',
    'header' => 'Нова заявка за консултация',
    'company' => 'Компания',
    'name' => 'Име',
    'phone' => 'Телефон',
    'email' => 'Email',
    'service' => 'Услуга',
    'datetime' => 'Дата и час',
    'footer_title' => 'IBM решения от A1 България',
    'footer_text' => 'Автоматично генерирано съобщение от контактната форма'
];

// Prepare email content
$subject = $t['subject'];
$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #DA291C; color: white; padding: 20px; text-align: center; }
        .content { background: #f5f5f5; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #DA291C; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #DA291C; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>" . $t['header'] . "</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>" . $t['company'] . ":</div>
                <div class='value'>" . htmlspecialchars($company) . "</div>
            </div>
            <div class='field'>
                <div class='label'>" . $t['name'] . ":</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>" . $t['phone'] . ":</div>
                <div class='value'>" . htmlspecialchars($phone) . "</div>
            </div>
            <div class='field'>
                <div class='label'>" . $t['email'] . ":</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>" . $t['service'] . ":</div>
                <div class='value'>" . htmlspecialchars($service) . "</div>
            </div>
            <div class='field'>
                <div class='label'>" . $t['datetime'] . ":</div>
                <div class='value'>" . htmlspecialchars($timestamp) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>" . $t['footer_title'] . "</p>
            <p>" . $t['footer_text'] . "</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: IBM A1 Form <' . SMTP_USER . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Send email using PHP mail() or SMTP
try {
    // For production, use PHPMailer or similar library for SMTP
    // This is a simple implementation using mail()

    // If using SMTP, uncomment and configure PHPMailer
    // require 'vendor/autoload.php';
    // use PHPMailer\PHPMailer\PHPMailer;
    // use PHPMailer\PHPMailer\Exception;

    // $mail = new PHPMailer(true);
    // $mail->isSMTP();
    // $mail->Host = SMTP_HOST;
    // $mail->SMTPAuth = true;
    // $mail->Username = SMTP_USER;
    // $mail->Password = SMTP_PASS;
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    // $mail->Port = SMTP_PORT;
    // $mail->setFrom(SMTP_USER, 'IBM A1 Form');
    // $mail->addAddress(SMTP_TO);
    // $mail->addReplyTo($email, $name);
    // $mail->isHTML(true);
    // $mail->Subject = $subject;
    // $mail->Body = $message;
    // $mail->send();

    // Simple mail() function (may not work on all servers)
    $success = mail(SMTP_TO, $subject, $message, implode("\r\n", $headers));

    if ($success) {
        // Update last submission time
        $_SESSION['last_submission'] = $current_time;

        // Log successful submission
        error_log("Form submission successful: {$email} - {$service}");

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    error_log("Email sending failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.'
    ]);
}
?>
