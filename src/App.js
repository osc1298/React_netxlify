
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// Initialize the CMS object


let img;
try{
  img = require('./img/qr.png');
}catch(e){
  img = null;
}

let respuesta='';


function App() {

  const [estado, setEstado] = useState('No hay session');

  const [open, setOpen] = React.useState(false);

 

  const handleClose = () => {
    setOpen(false);
  };


  /* <div className="App">
     {(img !== null) 
        ?<img src={img} alt="qr" />
        :<h1>Conectado</h1>}
    </div>*/

  async function conectar()
  {
    setOpen(true);
    setEstado('Esperando')
 await axios.get('http://localhost:5000/vincular').then((res)=>{respuesta= res.data.mensaje})
  console.log('estado', respuesta);
  console.log(estado, 'estado que se setea en estados')
  setEstado(respuesta);
  }


  async function desconectar(){
		
    axios.get('http://localhost:5000/desconectar').then((res)=>{respuesta= res.data.mensaje});
       console.log('adentro de desconectar');
   setEstado(respuesta);
   console.log('desconectado', estado)
   }
       
   function mostrar(){
     axios.get('http://localhost:5000/mostrar').then((res)=>{console.log(res.data.mensaje)});
     console.log('adentro de mostrar');
   }



  return (
    
    <div>
    <Button variant="outlined" onClick={conectar}>
      Vincular
    </Button>
    <Button variant="outlined" onClick={desconectar}>
     Desconectar
    </Button>
    <Button variant="outlined" onClick={mostrar}>
     mostrar
    </Button>
    <h1>{estado}</h1>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         Para Conectarte a whatsapp, escanea el qr 
        </DialogContentText>
      </DialogContent>
      <DialogContent>
      {(img !== null) 
        ?<img src={img} alt="qr" />
        :<h1>{estado}</h1>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}

export default App;
