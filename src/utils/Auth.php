<?php

require_once '../src/db/Database.php';

class Auth {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function verificarToken() {
        $headers = apache_request_headers();

        if (!isset($headers['Authorization'])) {
            echo json_encode(["Resultado" => 'No autorizado: encabezado de autorización faltante']);
            exit();
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        if (!$this->esTokenValido($token)) {
            echo json_encode(["Resultado" => 'Token no valido o expirado']);
            exit();
        }
    }

    private function esTokenValido($token) {
        $stmt = $this->db->connect()->prepare("SELECT * FROM tokens WHERE token = ? AND expires_at > NOW()");
        $stmt->execute([$token]);
        $tokenData = $stmt->fetch();

        return $tokenData ? true : false; 
    }
}
