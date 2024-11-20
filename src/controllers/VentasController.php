<?php


require_once '../src/models/Ventas.php';



class VentasController{

    public function ObtenerTodos(){
        $modeloventas= new Ventas();
        echo json_encode(value: ["Resultado" =>   $modeloventas->getAll()]);
    }

    public function ObtenerPorId($id){
        $modeloventas = new Ventas();
        echo json_encode(value: ["Resultado" =>   $modeloventas->getById($id)]);
    }

    public function crear()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modeloventas = new Ventas();
        echo json_encode(value: ["Resultado" =>   $modeloventas->create($data)]);        
    }

    public function eliminar($id)
    {
        $modeloventas = new Ventas();
        echo json_encode(value: ["Resultado" =>   $modeloventas->delete($id)]);        
    }

    public function actualizar($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modeloventas = new Ventas();        
        echo json_encode(value: ["Resultado" =>   $modeloventas->update($id,$data)]);
    }

}