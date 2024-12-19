<?php
require_once '../src/db/Database.php';

class Reportes {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function MarcasAlMenosUnaVentas(){
        $consulta = $this->db->connect()->query("SELECT * FROM MarcasAlMenosUnaVentas");
        return $consulta->fetchAll();
    }

    public function PrendasVendidasYCantidadStock(){
        $consulta = $this->db->connect()->query("SELECT * FROM PrendasVendidasYCantidadStock");
        return $consulta->fetchAll();
    }

    public function CincoMarcasMasVendidas(){
        $consulta = $this->db->connect()->query("SELECT * FROM CincoMarcasMasVendidas");
        return $consulta->fetchAll();
    }

    
}