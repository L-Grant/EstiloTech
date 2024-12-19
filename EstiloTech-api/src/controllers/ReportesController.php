<?php


require_once '../src/models/Reportes.php';



class ReportesController{
 
    public function MarcasAlMenosUnaVentas(){
        $modeloreporte_1 = new Reportes();
        echo json_encode(value: $modeloreporte_1->MarcasAlMenosUnaVentas());
    }

    public function PrendasVendidasYCantidadStock(){
        $modeloreporte_2 = new Reportes();
        echo json_encode(value: $modeloreporte_2->PrendasVendidasYCantidadStock());
    }

    public function CincoMarcasMasVendidas(){
        $modeloreporte_3 = new Reportes();
        echo json_encode(value: $modeloreporte_3->CincoMarcasMasVendidas());
    }
}