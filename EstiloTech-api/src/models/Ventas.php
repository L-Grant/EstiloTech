<?php
require_once '../src/db/Database.php';

class Ventas {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll(){
        $consulta = $this->db->connect()->query("SELECT * FROM ventas");
        return $consulta->fetchAll();
    }

    public function getById($id){
        $consulta = $this->db->connect()->prepare("SELECT * FROM ventas WHERE venta_id = ?");
        $consulta->execute([$id]);
        return $consulta->fetch();
    }

    public function create($data){
        $consulta = $this->db->connect()->prepare(
            "INSERT INTO ventas (fecha_venta, cliente_id, prenda_id, cantidad, subtotal) 
             VALUES (?, ?, ?, ?, ?)"
        );
        $consulta->execute([
            $data['fecha_venta'],
            $data['cliente_id'],
            $data['prenda_id'],
            $data['cantidad'],
            $data['subtotal']
        ]);
        return $this->db->connect()->lastInsertId();
    }    

    public function delete($id){
        $consulta = $this->db->connect()->prepare("DELETE FROM ventas WHERE venta_id = ?");
        $consulta->execute([$id]);
        return $consulta->rowCount();
    }

    public function update($id, $data) {
        $db = $this->db->connect();
        $consulta = "UPDATE ventas SET";
        $params = [];    

        if (isset($data['fecha_venta'])) {
            $consulta .= " fecha_venta = ?,";
            $params[] = $data['fecha_venta'];
        }
        if (isset($data['cliente_id'])) {
            $consulta .= " cliente_id = ?,";
            $params[] = $data['cliente_id'];
        }
        if (isset($data['prenda_id'])) {
            $consulta .= " prenda_id = ?,";
            $params[] = $data['prenda_id'];
        }
        if (isset($data['cantidad'])) {
            $consulta .= " cantidad = ?,";
            $params[] = $data['cantidad'];
        }
        if (isset($data['subtotal'])) {
            $consulta .= " subtotal = ?,";
            $params[] = $data['subtotal'];
        }

        $consulta = rtrim($consulta, ",");
        $consulta .= " WHERE venta_id = ?";
        $params[] = $id;

        $stmt = $db->prepare($consulta);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
}
