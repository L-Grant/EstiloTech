<?php
require_once '../src/db/Database.php';

class Prendas {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll(){
        $consulta = $this->db->connect()->query("SELECT * FROM prendas");
        return $consulta->fetchAll();
    }

    public function getById($id){
        $consulta = $this->db->connect()->prepare("SELECT * FROM prendas WHERE prenda_id = ?");
        $consulta->execute([$id]);
        return $consulta->fetch();
    }

    public function create($data){
        $consulta = $this->db->connect()->prepare(
            "INSERT INTO prendas (nombre, talla, color, precio, marca_id, stock) VALUES (?, ?, ?, ?, ?, ?)"
        );
        $consulta->execute([$data['nombre'],$data['talla'],$data['color'],$data['precio'],$data['marca_id'],$data['stock']]);
        return $this->db->connect()->lastInsertId();
    }    

    public function delete($id){
        $consulta = $this->db->connect()->prepare("DELETE FROM prendas WHERE prenda_id = ?");
        $consulta->execute([$id]);
        return $consulta->rowCount();
    }

    public function update($id, $data) {
        $db = $this->db->connect();
        $consulta = "UPDATE prendas SET";
        $params = [];    

        if (isset($data['nombre'])) {
            $consulta .= " nombre = ?,";
            $params[] = $data['nombre'];
        }
        if (isset($data['talla'])) {
            $consulta .= " talla = ?,";
            $params[] = $data['talla'];
        }
        if (isset($data['color'])) {
            $consulta .= " color = ?,";
            $params[] = $data['color'];
        }
        if (isset($data['precio'])) {
            $consulta .= " precio = ?,";
            $params[] = $data['precio'];
        }
        if (isset($data['marca_id'])) {
            $consulta .= " marca_id = ?,";
            $params[] = $data['marca_id'];
        }
        if (isset($data['stock'])) {
            $consulta .= " stock = ?,";
            $params[] = $data['stock'];
        }

        $consulta = rtrim($consulta, ",");
        $consulta .= " WHERE prenda_id = ?";
        $params[] = $id;

        $stmt = $db->prepare($consulta);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
}
