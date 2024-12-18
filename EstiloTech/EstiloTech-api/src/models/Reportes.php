<?php
require_once '../src/db/Database.php';

class Reportes {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function getVista_1(){
        $consulta = $this->db->connect()->query("SELECT * FROM MarcasAlMenosUnaVentas");
        return $consulta->fetchAll();
    }

    public function getVista_2(){
        $consulta = $this->db->connect()->query("SELECT * FROM PrendasVendidasYCantidadStock");
        return $consulta->fetchAll();
    }

    public function getVista_3(){
        $consulta = $this->db->connect()->query("SELECT * FROM CincoMarcasMasVendidas");
        return $consulta->fetchAll();
    }

    
}