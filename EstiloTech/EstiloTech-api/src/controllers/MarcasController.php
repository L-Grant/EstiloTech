<?php


require_once '../src/models/Marcas.php';



class MarcasController{

    public function ObtenerTodos(){
        $modelomarca= new Marcas();
        echo json_encode(value: $modelomarca->getAll());
    }

    public function ObtenerPorId($id){
        $modelomarca = new Marcas();
        echo json_encode(value: $modelomarca->getById($id));
    }

    public function crear()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modelomarca = new Marcas();
        echo json_encode(value: $modelomarca->create($data));        
    }

    public function eliminar($id)
    {
        $modelomarca = new Marcas();
        echo json_encode(value: $modelomarca->delete($id));        
    }

    public function actualizar($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modelomarca = new Marcas();        
        echo json_encode(value: $modelomarca->update($id,$data));
    }
    
}