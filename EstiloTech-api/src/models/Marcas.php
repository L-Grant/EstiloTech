<?php
require_once '../src/db/Database.php';

class Marcas {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll(){
        $consulta = $this->db->connect()->query("SELECT * FROM marcas");
        return $consulta->fetchAll();
    }

    public function getById($id){
        $consulta = $this->db->connect()->prepare("SELECT * FROM marcas WHERE marca_id = ?");
        $consulta->execute([$id]);
        return $consulta->fetch();
    }

    public function create($data){
        $consulta = $this->db->connect()->prepare(
            "INSERT INTO marcas (nombre, descripcion) VALUES (?, ?)"
        );
        $consulta->execute([$data['nombre'], $data['descripcion']]);
        return $this->db->connect()->lastInsertId();
    }    

    public function delete($id){
        $consulta = $this->db->connect()->prepare("DELETE FROM marcas WHERE marca_id = ?");
        $consulta->execute([$id]);
        return $consulta->rowCount();
    }

    public function update($id, $data) {
        $db = $this->db->connect();
        $consulta = "UPDATE marcas SET";
        $params = [];    

        if (isset($data['nombre'])) {
            $consulta .= " nombre = ?,";
            $params[] = $data['nombre'];
        }
        if (isset($data['descripcion'])) {
            $consulta .= " descripcion = ?,";
            $params[] = $data['descripcion'];
        }

        $consulta = rtrim($consulta, ",");
        $consulta .= " WHERE marca_id = ?";
        $params[] = $id;

        $stmt = $db->prepare($consulta);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
}
