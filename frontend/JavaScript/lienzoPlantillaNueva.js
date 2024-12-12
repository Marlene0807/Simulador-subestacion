
/*Se añade un evento que espera a que todo el contenido del documento
en el cual se asignara dependiendo del evento variables inmutables(const) o mutables(let)
para el correcto funcionaiento de la interaccion de los botones y las imagenes utilizadas */ 
document.addEventListener('DOMContentLoaded', function () {
    const lienzoElementos = document.querySelector('.imagenes-container');
    const canvas = document.getElementById('simulador-canvas');
    const ctx = canvas.getContext('2d');//Definir el contexto del dibujo en el lienzo
    const objectDropdown = document.getElementById('object-dropdown');//Menu desplegable para seleccionar objetos
    const deleteButton = document.getElementById('delete-button');//Boton que borrara el objeto previamente seleccionado
    const deleteAllButton = document.getElementById('delete-all-button');//Boton que borrara todos los elementos de la pizarra
    //const saveDropdown = document.getElementById('save-dropdown');//Menu desplegable de guardados
    //const saveButton = document.getElementById('save-button');//Generar un guardado de la pizarra actual
    //const loadButton = document.getElementById('load-button');//Cargar un guardado previo
    const guardadoR = document.getElementById('PruebaGuardadoR');//Cargar un guardado previo
    const guardadoA = document.getElementById('PruebaGuardadoArchivo');//Cargar un guardado previo
    const generarGuardado = document.getElementById('GenerarGuardado');//Cargar un guardado previo
    const botonEA = document.getElementById('Encender/Apagar');
    const simular = document.getElementById('Simulador');
    const vc = document.getElementById('ingresarVoltaje/Corriente');
    const input = document.getElementById('input');
    const corriente = document.getElementById('Corriente');
    const voltaje = document.getElementById('Voltaje');
    const IVS = document.getElementById('IngresarVoltajeS');
    const iVS = document.getElementById('ingresarVS');
    const vSalida = document.getElementById('VSalida');
    const cSalida = document.getElementById('CSalida');
    const aLectura = document.getElementById('archivoLectura');
    //const diagram = File("DiagramasBasicos\BarraSimple.txt");

    let images = [];
    let guardado=null;
    let draggingImage = null;
    let offsetX, offsetY;
    let firstClickedImage = null;
    let clickedImageIndex1;
    let lines = [];
    let ward = [];
    let atributos = [];
    let selectedImage = null;
    let selectedLine = null;
    let energizerLine = null;
    let imageCount = 0;
    //let saveCount = 0;
    let idComponent =0;
    let countLines = 0;
    const saveData = {};
    let textos =[];



    fetch(aLectura.textContent)
    .then(response => response.text())  // Convierte el contenido en texto
    .then(data => {
        //console.log("Contenido del archivo:", data);  // Muestra el contenido
        const label = document.getElementById('prueba');
        label.textContent=aLectura.textContent;
        guardado=data;
        CargarGuardado(); 
        prototipoGuardadoR();
    })
    .catch(error => {
        console.error("Error al leer el archivo:", error);
    });



/*Duplicacion de la imagen seleccionada apartir del click en la seccion de los componentes mediante
la espera de un evento*/ 
//podria quitarse esta parte para depender solo del dobleclick, por que en cambio se generan 3
    /*lienzoElementos.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            duplicateImage2(event.target);
        }
    });*/
    /*if(plantillaHecha!=null){
        const file = plantillaHecha;
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                guardado=e.target.result;
                document.getElementById('output').textContent = e.target.result;
            };
            reader.readAsText(file);
        }
        prototipoGuardadoArchivo();
        prototipoGuardadoR();
    }*/
/*Duplicacion de la imagen seleccionada apartir del click en la seccion de los componentes*/ 
    lienzoElementos.addEventListener('dblclick', function (event) {
        if (event.target.tagName === 'IMG') {
            
            duplicateImage(event.target);
        }
    });
/*Funcion de la duplicacion de elementos en la cual se generaran en un punto especifico del canvas(pizarron 
generado como nuestra area de trabajo), tomando como parametros la imagen a duplicar*/ 
    function duplicateImage(imageElement) {
        const img = new Image();
        img.src = imageElement.src;
        if(simular.textContent!="Apagar simulacion"){
/*Generacion del objeto imagen con la asignacion de la imagen seleccionada,
una posicion predefinida y un tamaño predefinido */  
if(imageElement.id==1){     
        img.onload = () => {
            const newImage = {
                img: img,
                src: imageElement.src,
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 60,
                height: 60,
                id: `image-${imageCount++}`,//Identificador para cada imagen para el tener un control de lo ya generado
                selected: false,
                voltaje:0,
                corriente:0,
                estatus: "off",
                estado: "no-energizado",
                tipe: "Alimentador-Comun",
                CC1:[],
                CC2:[],
                idComponent: idComponent++
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    if(imageElement.id==2){     
        img.onload = () => {
            const newImage = {
                img: img,
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 60,
                height: 60,
                voltaje:0,
                corriente:0,
                estatus:"off",
                estado: "no-energizado",
                id: `image-${imageCount++}`,//Identificador para cada imagen para el tener un control de lo ya generado
                selected: false,
                tipe: "Cuchilla",
                idComponent: idComponent++
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    if(imageElement.id==3){     
        img.onload = () => {
            const newImage = {
                img: img,
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 60,
                height: 60,
                voltaje:0,
                corriente:0,
                estatus:"off",
                estado: "no-energizado",
                id: `image-${imageCount++}`,//Identificador para cada imagen para el tener un control de lo ya generado
                selected: false,
                tipe: "Interruptor",
                idComponent: idComponent++
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    if(imageElement.id==4){     
        img.onload = () => {
            const newImage = {
                img: img,
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 60,
                height: 60,
                voltaje:0,
                voltajeS:0,
                corriente:0,
                corrienteS:0,
                estatus:"off",
                estado: "no-energizado",
                id: `image-${imageCount++}`,//Identificador para cada imagen para el tener un control de lo ya generado
                selected: false,
                tipe: "Transformador-Subida",
                idComponent: idComponent++
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    if(imageElement.id==5){     
        img.onload = () => {
            const newImage = {
                img: img,
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 60,
                height: 60,
                voltaje:0,
                corriente:0,
                voltajeS:0,
                corrienteS:0,
                estatus:"off",
                estado: "no-energizado",
                id: `image-${imageCount++}`,//Identificador para cada imagen para el tener un control de lo ya generado
                selected: false,
                tipe: "Transformador-Bajada",
                idComponent: idComponent++
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    if(imageElement.id==6){     
        img.onload = () => {
            const newImage = {
                img: img,
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 180,
                height: 60,
                voltaje:0,
                corriente:0,
                estado: "no-energizado",
                id: `image-${imageCount++}`,//Identificador para cada imagen para el tener un control de lo ya generado
                selected: false,
                tipe: "Barra",
                idComponent: idComponent++
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
}
    }
/*Creacion inicial de la interfaz en el menu del simulador y se ejecutara en cada momento que se añada 
un elemento y/o camino, al eliminar un elemento y al cargar un guardado*/ 
    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//Metodo en el cual se genera un espacio para la pizarra

        lines.forEach((line, index) => {//Encargado de generar cada camino(conexion) entre componente
            ctx.beginPath();
            ctx.moveTo(line.startImage.x + line.startImage.width / 2, line.startImage.y + line.startImage.height / 2);
            ctx.lineTo(line.endImage.x + line.endImage.width / 2, line.endImage.y + line.endImage.height / 2);
            if(line.estado=="on"){
                ctx.strokeStyle='red';
                ctx.lineWidth = 4;
                ctx.stroke();
            }
            else{
            ctx.strokeStyle = (selectedLine === index) ? 'yellow' : 'black';
            ctx.lineWidth = 2;
            ctx.stroke();
            }
        });

        images.forEach(image => {//Encargado de generar cada camino(conexion) entre componente
            
            ctx.drawImage(image.img, image.x, image.y, image.width, image.height);
            if (image === selectedImage) {
                ctx.strokeStyle = 'yellow';
                ctx.lineWidth = 3;
                ctx.strokeRect(image.x, image.y, image.width, image.height);
            }
        });
    }

    function updateDropdown() {
        objectDropdown.innerHTML = '<option value="" disabled selected>Seleccionar objeto</option>';
       /* images.forEach(image => {
            const option = document.createElement('option');
            option.value = image.id;
            option.textContent =  image.tipe +": " +image.idComponent;
            objectDropdown.appendChild(option);
        });*/
        lines.forEach((line, index) => {
            const option = document.createElement('option');
            option.value = `line-${index}`;
            option.textContent = `Línea ${index + 1}`;
            objectDropdown.appendChild(option);
        });
    }
    function generarObjetosGuardados(estructura) {
            if(estructura=="Alimentador-Comun"){
                CargarGuardadoAlimentadorComun(document.getElementById('1'),atributos[1],atributos[2],60,60, atributos[5],atributos[6],atributos[7],atributos[0],atributos[9]);          
            }//                                        figura                      x         y         w  h    img-0        v           corriente            estatus      tipe        id component   
            if(estructura=="Cuchilla"){
                CargarGuardadoCuchilla(document.getElementById('2'),atributos[1],atributos[2],60,60, atributos[5],atributos[6],atributos[7],atributos[0],atributos[8]);
            }
            if(estructura=="Interruptor"){
                CargarGuardadoInterruptor(document.getElementById('3'),atributos[1],atributos[2],60,60, atributos[5],atributos[6],atributos[7],atributos[0],atributos[8]);
            }
            if(estructura=="Transformador-Subida"){
                CargarGuardadoTransformadorSubida(document.getElementById('4'),atributos[1],atributos[2],60,60, atributos[5],atributos[6],atributos[7],atributos[0],atributos[8]);
            }      
            if(estructura=="Transformador-Bajada"){
                CargarGuardadoTransformadorBajada(document.getElementById('5'),atributos[1],atributos[2],60,60, atributos[5],atributos[6],atributos[7],atributos[0],atributos[8]);
            }    
            if(estructura=="Barra"){
                CargarGuardadoBarra(document.getElementById('6'),atributos[1],atributos[2],180,60, atributos[5],atributos[6],atributos[7],atributos[0],atributos[8]);
            }
            if(estructura=="Line"){
                if(images.length>=2){
                CargarGuardadoLine(atributos[1],atributos[2]);
                }
            }
    }

    function prototipoGuardadoR(){
        ward = guardado.split("\n");
        
for(var i =0;i<ward.length;i++){
            atributos= ward[i].split("|");
            if(atributos[0]=="Line"){
            generarObjetosGuardados(atributos[0]);
            }
        }    
    }



    function CargarGuardadoCuchilla(p,xd,yd,widthd, heightd, idd,voltajed,corriented, tiped, idComponentd){
        const imgd = new Image();
        imgd.src = p.src;
        imgd.onload = () => {
            const newImage = {
                img: imgd,
                src: p.src,
                x: xd,
                y: yd,
                width: widthd,
                height: heightd,
                id: idd,
                selected: false,
                voltaje:voltajed,
                corriente:corriented,
                estatus: "off",
                estado: "no-energizado",
                tipe: tiped,
                idComponent: idComponentd
            };
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    function CargarGuardadoInterruptor(p,xd,yd,widthd, heightd, idd,voltajed,corriented, tiped, idComponentd){
        const imgd = new Image();
        imgd.src = p.src;
        imgd.onload = () => {
            const newImage = {
                img: imgd,
                src: p.src,
                x: xd,
                y: yd,
                width: widthd,
                height: heightd,
                id: idd,
                selected: false,
                voltaje:voltajed,
                corriente:corriented,
                estatus: "off",
                estado: "no-energizado",
                tipe: tiped,
                idComponent: idComponentd
            };
            imageCount++;
            idComponent++;
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    function CargarGuardadoTransformadorSubida(p,xd,yd,widthd, heightd, idd,voltajed,corriented, tiped, idComponentd){
        const imgd = new Image();
        imgd.src = p.src;
        imgd.onload = () => {
            const newImage = {
                img: imgd,
                src: p.src,
                x: xd,
                y: yd,
                width: widthd,
                height: heightd,
                id: idd,
                selected: false,
                voltajeS:voltajed,
                corrienteS:corriented,
                voltaje:0,
                corriente:0,
                estatus: "off",
                estado: "no-energizado",
                tipe: tiped,
                idComponent: idComponentd
            };
            imageCount++;
            idComponent++;
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    function CargarGuardadoTransformadorBajada(p,xd,yd,widthd, heightd, idd,voltajed,corriented, tiped, idComponentd){
        const imgd = new Image();
        imgd.src = p.src;
        imgd.onload = () => {
            const newImage = {
                img: imgd,
                src: p.src,
                x: xd,
                y: yd,
                width: widthd,
                height: heightd,
                id: idd,
                selected: false,
                voltajeS:voltajed,
                corrienteS:corriented,
                voltaje:0,
                corriente:0,
                estatus: "off",
                estado: "no-energizado",
                tipe: tiped,
                idComponent: idComponentd
            };
            imageCount++;
            idComponent++;
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    function CargarGuardadoBarra(p,xd,yd,widthd, heightd, idd,voltajed,corriented, tiped, idComponentd){
        const imgd = new Image();
        imgd.src = p.src;
        imgd.onload = () => {
            const newImage = {
                img: imgd,
                src: p.src,
                x: xd,
                y: yd,
                width: widthd,
                height: heightd,
                id: idd,
                selected: false,
                voltaje:voltajed,
                corriente:corriented,
                estatus: "off",
                estado: "no-energizado",
                tipe: tiped,
                idComponent: idComponentd
            };
            imageCount++;
            idComponent++;
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    function CargarGuardadoAlimentadorComun(p,xd,yd,widthd, heightd, idd,voltajed, corriented, tiped, idComponentd){
        const imgd = new Image();
        imgd.src = p.src;
        imgd.onload = () => {
            const newImage = {
                img: imgd,
                src: p.src,
                x: xd,
                y: yd,
                width: widthd,
                height: heightd,
                id: idd,
                selected: false,
                voltaje:voltajed,
                corriente: corriented,
                estatus: "off",
                estado: "no-energizado",
                tipe: tiped,
                idComponent: idComponentd
            };
            imageCount++;
            idComponent++;
            images.push(newImage);
            updateDropdown();
            drawCanvas();
        };
    }
    function CargarGuardadoLine(Img1,Img2){
        const firstClickedImage = images[Img1];
        const clickedImage = images[Img2];
        const line = {
            startImage: firstClickedImage,
            endImage: clickedImage,
            ImgInicial: Img1,
            ImgFinal: Img2,
            estado: ""
        };
        imageCount++;
        idComponent++;
        lines.push(line);
        updateDropdown();
        drawCanvas();
    }


function prototipoGuardadoArchivo(){
    textos=[];
    images.forEach(image => {
        if(image.tipe=="Alimentador-Comun"){          
            const textConcatenado = (image.tipe+"|"+image.x+"|"+image.y+"|"+image.width+"|"+image.height+"|"+image.id+"|"+image.voltaje+"|"+image.corriente+"|"+image.estado+"|"+image.idComponent+ " ");
            textos.push(textConcatenado);  
        }
        if(image.tipe=="Cuchilla"){          
            const textConcatenado = (image.tipe+"|"+image.x+"|"+image.y+"|"+image.width+"|"+image.height+"|"+image.id+"|"+image.voltaje+"|"+image.corriente+"|"+image.idComponent+ " ");
            textos.push(textConcatenado);  
        }
        if(image.tipe=="Interruptor"){          
            const textConcatenado = (image.tipe+"|"+image.x+"|"+image.y+"|"+image.width+"|"+image.height+"|"+image.id+"|"+image.voltaje+"|"+image.corriente+"|"+image.idComponent+ " ");
            textos.push(textConcatenado);  
        }
        if(image.tipe=="Transformador-Subida"){          
            const textConcatenado = (image.tipe+"|"+image.x+"|"+image.y+"|"+image.width+"|"+image.height+"|"+image.id+"|"+image.voltajeS+"|"+image.corrienteS+"|"+image.idComponent+ " ");
            textos.push(textConcatenado);  
        }
        if(image.tipe=="Transformador-Bajada"){          
            const textConcatenado = (image.tipe+"|"+image.x+"|"+image.y+"|"+image.width+"|"+image.height+"|"+image.id+"|"+image.voltajeS+"|"+image.corrienteS+"|"+image.idComponent+ " ");
            textos.push(textConcatenado);  
        }
        if(image.tipe=="Barra"){          
            const textConcatenado = (image.tipe+"|"+image.x+"|"+image.y+"|"+image.width+"|"+image.height+"|"+image.id+"|"+image.voltaje+"|"+image.corriente+"|"+image.idComponent+ " ");
            textos.push(textConcatenado);  
        }
        
});
    // Función para guardar un array en un archivo de texto
const guardarArrayEnTxt = (arreglo, pttp) => {
    // Convertir el array a una cadena de texto
    const contenido = arreglo.join('\n');
    
    // Crear un Blob con el contenido
    const archivo = new Blob([contenido], { type: 'text/plain' });
    
    // Crear una URL para el Blob
    const url = URL.createObjectURL(archivo);
    
    // Crear un elemento <a> oculto y simular un clic para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = pttp;
    a.click();
    
    // Revocar la URL para liberar memoria
    URL.revokeObjectURL(url);
};


lines.forEach((line) => {//Encargado de generar cada camino(conexion) entre componente
    const textConcatenado = ("Line|"+line.ImgInicial+"|"+line.ImgFinal);
    textos.push(textConcatenado);  
});
guardarArrayEnTxt(textos, 'PrototipoGuardado.txt');
}

// La imagen seleccionada del menu de objetos creados sera eliminado
    function removeSelectedObject() {
        if (selectedImage) {
            images = images.filter(image => image !== selectedImage);
           // eliminarConexiones(selectedImage);
            selectedImage = null;
        } else if (selectedLine !== null) {
            lines.splice(selectedLine, 1);
            selectedLine = null;
        }
        updateDropdown();//Actualizar el menu de objetos creados
        drawCanvas();
    }

    function removeAllObjects() {
        images = [];
        lines = [];
        imageCount=0;
        selectedImage = null;
        selectedLine = null;
        updateDropdown();
        drawCanvas();
    }

    /*function saveCurrentState() {
        const stateKey = `Guardado ${++saveCount}`;
        saveData[stateKey] = {
            images: JSON.parse(JSON.stringify(images)),
            lines: JSON.parse(JSON.stringify(lines))
        };
        updateSaveDropdown();
    }*/

    /*function loadSavedState() {
        const selectedKey = saveDropdown.value;
        if (saveData[selectedKey]) {
            images = JSON.parse(JSON.stringify(saveData[selectedKey].images));
            lines = JSON.parse(JSON.stringify(saveData[selectedKey].lines));
            selectedImage = null;
            selectedLine = null;
            updateDropdown();
            drawCanvas();
        }
    }*/

    function CargarGuardado(){
       removeAllObjects();
       //simular.textContent="Encender simulacion";
        ward = guardado.split("\n");
        atributos = ward[0].split("|");
for(var i =0;i<ward.length;i++){
            atributos= ward[i].split("|");
            if(atributos[0]!="Line"){
            generarObjetosGuardados(atributos[0]);
            }
        else{
            countLines++;
        }
    }
 
}
document.getElementById('file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            guardado=e.target.result;
            document.getElementById('output').textContent = e.target.result;
        };
        reader.readAsText(file);
    }

});
//Funcion en la que al mantener el click sobre una imagen se podra arrastras y soltar dentro de la pizarra
    canvas.addEventListener('mousedown', function (event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        draggingImage = images.find(image =>
            mouseX >= image.x && mouseX <= image.x + image.width &&
            mouseY >= image.y && mouseY <= image.y + image.height
        );

        if (draggingImage) {
            offsetX = mouseX - draggingImage.x;
            offsetY = mouseY - draggingImage.y;
            canvas.addEventListener('mousemove', onMouseMove);
            canvas.addEventListener('mouseup', onMouseUp);
        }
    });

    function onMouseMove(event) {
        if (draggingImage) {
            draggingImage.x = event.offsetX - offsetX;
            draggingImage.y = event.offsetY - offsetY;
            constrainImage(draggingImage);
            drawCanvas();
        }
    }

    function onMouseUp() {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);
    }

    function constrainImage(image) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        if (image.x < 0) image.x = 0;
        if (image.y < 0) image.y = 0;
        if (image.x + image.width > canvasWidth) image.x = canvasWidth - image.width;
        if (image.y + image.height > canvasHeight) image.y = canvasHeight - image.height;
    }

    canvas.addEventListener('dblclick', function (event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        
        const clickedImage = images.find(image =>
            mouseX >= image.x && mouseX <= image.x + image.width &&
            mouseY >= image.y && mouseY <= image.y + image.height
            
        );
        const clickedImageIndex = images.findIndex(image =>
            mouseX >= image.x && mouseX <= image.x + image.width &&
            mouseY >= image.y && mouseY <= image.y + image.height
            
        );    
        if (clickedImage) {
            
            if (firstClickedImage) {
                if(clickedImageIndex!=clickedImageIndex1){
                const line = {
                    startImage: firstClickedImage,
                    endImage: clickedImage,
                    ImgInicial: clickedImageIndex1,
                    ImgFinal: clickedImageIndex,
                    estado: "off"
                };
                /*startImage.CC1.push(clickedImageIndex);
                endImage.CC2.push(clickedImageIndex1);*/
            lines.push(line);
                updateDropdown();
                drawCanvas();
                }
                firstClickedImage = null;
            } else {
                firstClickedImage = clickedImage;
                clickedImageIndex1 = clickedImageIndex;
            }
        }
    });
    canvas.addEventListener('click', function (event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        
        const clickedImage = images.find(image =>
            mouseX >= image.x && mouseX <= image.x + image.width &&
            mouseY >= image.y && mouseY <= image.y + image.height
            
        );
        selectedImage = clickedImage;
        selectedLine = null;
        mostrarAtributos(selectedImage);
  

        drawCanvas();
      
  
    });
    
    
//Selector de un objeto al ser seleccionado mediante el despliegue de la lista
    objectDropdown.addEventListener('change', function () {
        const selectedId = objectDropdown.value;
        if (selectedId.startsWith('line-')) {
            selectedLine = parseInt(selectedId.split('-')[1]);
            selectedImage = null;
        } else {
            selectedImage = images.find(image => image.id === selectedId);
            selectedLine = null;
        }
        drawCanvas();
    });
    function encenderApagar(){
        const EA = selectedImage.estatus;
        if(selectedImage.tipe=="Cuchilla"){
        if(EA=="off"){
            selectedImage.estatus="on";
            selectedImage.img=document.getElementById("2-2");
            mostrarAtributos(selectedImage);
            drawCanvas();
            pruebaLines();
        }
        if(EA=="on"){
            selectedImage.estatus="off";
            selectedImage.img=document.getElementById("2");
            mostrarAtributos(selectedImage);
            drawCanvas();
            pruebaLines();
        }
    }
    else{
        if(EA=="off"){
            selectedImage.estatus="on";
            selectedImage.img=document.getElementById("3-2");
            mostrarAtributos(selectedImage);
            drawCanvas();
            pruebaLines();
        }
        if(EA=="on"){
            selectedImage.estatus="off";
            selectedImage.img=document.getElementById("3");
            mostrarAtributos(selectedImage);
            drawCanvas();
            pruebaLines();
        }
    }
        mostrarAtributos(selectedImage);
        drawCanvas();
    }
    function mostrarAtributos(Elemento){
        botonEA.setAttribute('hidden',true);
        vc.setAttribute('hidden', true);
        IVS.setAttribute('hidden', true);
        const clickedImage=Elemento;
        const label = document.getElementById('prueba');
        const label2 = document.getElementById('prueba2');
        const label3 = document.getElementById('prueba3');
        const label4= document.getElementById('prueba4');
        const label5 = document.getElementById('prueba5');
        const label6 = document.getElementById('prueba6');
        if(clickedImage.tipe=="Alimentador-Comun"){

            vc.removeAttribute('hidden');
            label.textContent="Objeto: "+(clickedImage.tipe) +" "+(clickedImage.idComponent); 
            label2.textContent="Estatus: "+(clickedImage.estatus);
            label3.textContent="Voltaje: "+(clickedImage.voltaje); 
            label4.textContent="Corriente: "+(clickedImage.corriente); 
            label5.textContent="Estado: "+(clickedImage.estado);
            label6.textContent="";
        }
        if(clickedImage.tipe=="Cuchilla"){
            botonEA.removeAttribute('hidden');
            label.textContent="Objeto: "+(clickedImage.tipe) +" "+(clickedImage.idComponent); 
            label2.textContent="";
            label3.textContent="Estatus: "+(clickedImage.estatus); 
            label4.textContent="Estado: "+(clickedImage.estado); 
            label5.textContent="Voltaje: "+(clickedImage.voltaje);
            label6.textContent="Corriente:"+(clickedImage.corriente);
        }
        if(clickedImage.tipe=="Interruptor"){
            botonEA.removeAttribute('hidden');
            label.textContent="Objeto: "+(clickedImage.tipe) +" "+(clickedImage.idComponent); 
            label2.textContent="";
            label3.textContent="Estatus: "+(clickedImage.estatus); 
            label4.textContent="Estado: "+(clickedImage.estado); 
            label5.textContent="Voltaje: "+(clickedImage.voltaje);
            label6.textContent="Corriente:"+(clickedImage.corriente);
        }
        if(clickedImage.tipe=="Transformador-Subida"){
            IVS.removeAttribute('hidden');
            label.textContent="Objeto: "+(clickedImage.tipe) +" "+(clickedImage.idComponent); 
            label2.textContent="Voltaje entrada: "+(clickedImage.voltaje); 
            label3.textContent="Corriente entrada: "+(clickedImage.corriente);
            label4.textContent="Voltaje salida: "+(clickedImage.voltajeS); 
            label5.textContent="Corriente salida: "+(clickedImage.corrienteS);
            label6.textContent="Estado: "+(clickedImage.estado);
        }
        if(clickedImage.tipe=="Transformador-Bajada"){
            IVS.removeAttribute('hidden');
            label.textContent="Objeto: "+(clickedImage.tipe) +" "+(clickedImage.idComponent); 
            label2.textContent="Voltaje entrada: "+(clickedImage.voltaje); 
            label3.textContent="Corriente entrada: "+(clickedImage.corriente);
            label4.textContent="Voltaje salida: "+(clickedImage.voltajeS); 
            label5.textContent="Corriente salida: "+(clickedImage.corrienteS);
            label6.textContent="Estado: "+(clickedImage.estado);
        }
        if(clickedImage.tipe=="Barra"){
            label.textContent="Objeto: "+(clickedImage.tipe) +" "+(clickedImage.idComponent); 
            label2.textContent="";
            label3.textContent="Voltaje: "+(clickedImage.voltaje); 
            label4.textContent="Corriente: "+(clickedImage.corriente);
            label5.textContent="Estado: "+(clickedImage.estado);
            label6.textContent="";
        }
    }
    function iniciarS(){
        //simular.textContent="Apagar simulacion";
       if(simular.textContent=="Apagar simulacion"){
            simular.textContent="Empezar Simulador";
            images.forEach(image => {
                if(image.tipe=="Barra"){
                    image.estatus="off";
                    image.estado="no-energizado";
                    mostrarAtributos(image);
                }
                if(image.tipe=="Transformador-Subida"){
                    image.estatus="off";
                    image.estado="no-energizado";
                    mostrarAtributos(image);
                }
                if(image.tipe=="Transformador-Bajada"){
                    image.estatus="off";
                    image.estado="no-energizado";
                    mostrarAtributos(image);
                }
                if(image.tipe=="Alimentador-Comun"){
                    image.estatus="off";
                    image.estado="no-energizado";
                    mostrarAtributos(image);
                }
            });
        }
        if(simular.textContent=="Empezar Simulador"){
            simular.textContent="Apagar simulacion";
            images.forEach(image => {
                if(image.tipe=="Alimentador-Comun"){
                    image.estatus="on";
                    image.estado="energizado";
                    mostrarAtributos(image);
                }
                if(image.tipe=="Barra"){
                    image.estatus="on";
                }
                if(image.tipe=="Transformador-Subida"){
                    image.estatus="on";
                }
                if(image.tipe=="Transformador-Bajada"){
                    image.estatus="on";
                }
            });
            //pruebaLines();
        }
    pruebaLines();
drawCanvas();
mostrarAtributos(selectedImage);
}

function pruebaLines(){
    const label = document.getElementById('prueba7');
    label.textContent="va 1";
    for(var i=0; i<lines.length; i++){
       const P1=lines[i].ImgInicial;
       const P2 =lines[i].ImgFinal;
       if(images[P1].estatus=="on"&&images[P1].estado=="energizado"){
        const label = document.getElementById('prueba7');
        label.textContent=images[P2].tipe;
        images[P2].estado="energizado";
        images[P2].voltaje=images[P1].voltaje;
        images[P2].corriente=images[P1].corriente;
        lines[i].estado="on";
        label.textContent=lines[i].tipo;
        
        /*if(images[P1].tipe=="Cuchilla"){
            if(images[P1].estatus=="on"){
                lines[i].estado="on";
                images[P2].estado="energizado";
                images[P2].voltaje=images[P1].voltaje;
                images[P2].corriente=images[P1].corriente;
            }            
            if(images[P1].estatus=="off"){
                images[P2].estado="no-energizado";
                images[P2].voltaje=0;
                images[P2].corriente=10;
            }
        }
        if(images[P1].tipe=="Interruptor"){
            if(images[P1].estatus=="on"){
                images[P2].estado="energizado";
                images[P2].voltaje=images[P1].voltaje;
                images[P2].corriente=images[P1].corriente;
            }            
            if(images[P1].estatus=="off"){
                images[P2].estado="no-energizado";
                images[P2].voltaje=0;
                images[P2].corriente=0;
            }
        }*/
        /*else{
            images[P2].estado="energizado";
            images[P2].voltaje=images[P1].voltaje;
            images[P2].corriente=images[P1].corriente;
        }*/

    }
    else{
        images[P2].estado="no-energizado";
        images[P2].voltaje=0;
        images[P2].corriente=0;
        lines[i].estado="off";
    }
    /*if(images[P2].estatus=="on"&&images[P2].estado=="energizado"){
        const label = document.getElementById('prueba7');
        label.textContent=images[P1].tipe;
        images[P1].estado="energizado";
        images[P1].voltaje=images[P2].voltaje;
        images[P1].corriente=images[P2].corriente;
        lines[i].estado="on";
        label.textContent=lines[i].tipo;
    }
    else{
        images[P2].estado="no-energizado";
        images[P2].voltaje=0;
        images[P2].corriente=0;
        lines[i].estado="off";
    }*/
        /*images.forEach(image => {
            label.textContent=image.estado+image.tipe;
            if(image.estado=="energizado"){
                lines[i].ImgFinal
                label.textContent="va 2";
                ctx.strokeStyle = 'red';
                ctx.stroke();
            }
            con++;
        });*/
    }

    //label.textContent=lines[1].ImgInicial+lines[1].ImgFinal;
}

function ingresarVoltajeCorrienteP1(){
    vc.setAttribute('hidden',true);
    voltaje.removeAttribute('hidden');
    corriente.removeAttribute('hidden');
    input.removeAttribute('hidden');
}
function ingresarVoltajeCorrienteP2(){
    if((document.getElementById('Voltaje')!="")&&(document.getElementById('Corriente')!=""))
selectedImage.voltaje=document.getElementById('Voltaje').value;
selectedImage.corriente=document.getElementById('Corriente').value;
corriente.setAttribute('hidden',true);
voltaje.setAttribute('hidden',true);
input.setAttribute('hidden',true);
mostrarAtributos(selectedImage);
}

function ingresarVoltajeSP1(){
    IVS.setAttribute('hidden',true);
    vSalida.removeAttribute('hidden');
    cSalida.removeAttribute('hidden');
    iVS.removeAttribute('hidden');
    
}
function ingresarVoltajeSP2(){
    if((document.getElementById('VoltajeS')!=""))
selectedImage.voltajeS=document.getElementById('VSalida').value;
selectedImage.corrienteS=document.getElementById('CSalida').value;
vSalida.setAttribute('hidden',true);
cSalida.setAttribute('hidden',true);
iVS.setAttribute('hidden',true);
mostrarAtributos(selectedImage);
}
/*

    lines.forEach((line, index) => {
        const option = document.createElement('option');
        option.value = `line-${index}`;
        option.textContent = `Línea ${index + 1}`;
        objectDropdown.appendChild(option);
    });*/
    
    /*Seccion de los botones activados por medio de un click, para proceder con su respectivo evento*/
    deleteButton.addEventListener('click', removeSelectedObject);
    deleteAllButton.addEventListener('click', removeAllObjects);
    //saveButton.addEventListener('click', saveCurrentState);
    //loadButton.addEventListener('click', loadSavedState);
    guardadoR.addEventListener('click', prototipoGuardadoR);
    guardadoA.addEventListener('click', prototipoGuardadoArchivo);
    generarGuardado.addEventListener('click', CargarGuardado);
    botonEA.addEventListener('click', encenderApagar);
    simular.addEventListener('click', iniciarS);
    vc.addEventListener('click',ingresarVoltajeCorrienteP1);
    input.addEventListener('click',ingresarVoltajeCorrienteP2);
    IVS.addEventListener('click',ingresarVoltajeSP1);
    iVS.addEventListener('click',ingresarVoltajeSP2);
    drawCanvas();
});
