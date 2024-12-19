<?php


require_once '../src/models/Ventas.php';



class VentasController{

    public function ObtenerTodos(){
        $modeloventas= new Ventas();
        echo json_encode(value: $modeloventas->getAll());
    }

    public function ObtenerPorId($id){
        $modeloventas = new Ventas();
        echo json_encode(value: $modeloventas->getById($id));
    }

    public function crear()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modeloventas = new Ventas();
        echo json_encode(value: $modeloventas->create($data));        
    }

    public function eliminar($id)
    {
        $modeloventas = new Ventas();
        echo json_encode(value: $modeloventas->delete($id));        
    }

    public function actualizar($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modeloventas = new Ventas();        
        echo json_encode(value: $modeloventas->update($id,$data));
    }

}