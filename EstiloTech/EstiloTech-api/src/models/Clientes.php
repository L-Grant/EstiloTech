<?php
require_once '../src/db/Database.php';

class Clientes {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll(){
        $consulta = $this->db->connect()->query("SELECT * FROM clientes");
        return $consulta->fetchAll();
    }

    public function getById($id){
        $consulta = $this->db->connect()->prepare("SELECT * FROM clientes WHERE cliente_id = ?");
        $consulta->execute(params: [$id]);
        return $consulta->fetch();
    }

    public function create($data){
        $consulta = $this->db->connect()->prepare(
            "INSERT INTO clientes (nombre, apellido_1, apellido_2, email, telefono) VALUES (?, ?, ?, ?, ?)");
        $consulta->execute([$data['nombre'],$data['apellido_1'],$data['apellido_2'],$data['email'],$data['telefono']]);
        return $this->db->connect()->lastInsertId();
    }    

    public function delete($id){
        $consulta = $this->db->connect()->prepare("DELETE FROM clientes WHERE cliente_id = ? ");
        $consulta->execute([$id]);
        return $consulta->rowCount();
    }

    public function update($id, $data) {
        $db = Database::connect();
        $consulta = "UPDATE clientes SET";
        $params = [];    
        
        if (isset($data['nombre'])) {
            $consulta .= " nombre = ?,";
            $params[] = $data['nombre'];
        }
        if (isset($data['apellido_1'])) {
            $consulta .= " apellido_1 = ?,";
            $params[] = $data['apellido_1'];
        }
        if (isset($data['apellido_2'])) {
            $consulta .= " apellido_2 = ?,";
            $params[] = $data['apellido_2'];
        }
        if (isset($data['email'])) {
            $consulta .= " email = ?,";
            $params[] = $data['email'];
        }
        if (isset($data['telefono'])) {
            $consulta .= " telefono = ?,";
            $params[] = $data['telefono'];
        }
        
        $consulta = rtrim($consulta, ",");
        $consulta .= " WHERE cliente_id = ?";
        $params[] = $id;
    
        $stmt = $db->prepare($consulta);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
    
}