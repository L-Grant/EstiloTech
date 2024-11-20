<?php


require_once '../src/models/Prendas.php';



class PrendasController{

    public function ObtenerTodos(){
        $modeloprenda= new Prendas();
        echo json_encode(value: ["Resultado" =>   $modeloprenda->getAll()]);
    }

    public function ObtenerPorId($id){
        $modeloprenda = new Prendas();
        echo json_encode(value: ["Resultado" =>   $modeloprenda->getById($id)]);
    }

    public function crear()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modeloprenda = new Prendas();
        echo json_encode(value: ["Resultado" =>   $modeloprenda->create($data)]);        
    }

    public function eliminar($id)
    {
        $modeloprenda = new Prendas();
        echo json_encode(value: ["Resultado" =>   $modeloprenda->delete($id)]);        
    }

    public function actualizar($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modeloprenda = new Prendas();        
        echo json_encode(value: ["Resultado" =>   $modeloprenda->update($id,$data)]);
    }

}