<?php


require_once '../src/models/Clientes.php';



class ClientesController{

    public function ObtenerTodos(){
        $modelocliente = new Clientes();
        echo json_encode(value: $modelocliente->getAll());
    }

    public function ObtenerPorId($id){
        $modelocliente = new Clientes();
        echo json_encode(value: $modelocliente->getById($id));
    }

    public function crear()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modelocliente = new Clientes();
        echo json_encode(value: $modelocliente->create($data));        
    }

    public function eliminar($id)
    {
        $modelocliente = new Clientes();
        echo json_encode(value: $modelocliente->delete($id));        
    }

    public function actualizar($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $modelocliente = new Clientes();        
        echo json_encode(value: $modelocliente->update($id,$data));
    }
    
}