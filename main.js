let drawing = false;
const colorPicker = document.getElementById('colorPicker');
let color = '#000000'
let canvasColor = '#b0b0b0'


colorPicker.addEventListener('input', function(event) {
    const selectedColor = event.target.value;
    console.log('Selected color:', selectedColor);
    color = selectedColor;
    // Perform any actions you want with the selected color
  });


window.addEventListener('mousedown', () => {
    drawing = true;
})

window.addEventListener('mouseup', () => {
    drawing = false;
})



const canvas = document.getElementById('canvas');
const pixelSlider = document.getElementById('pixelSizeSlider');
const canvasColorPicker = document.getElementById('backgroundColor');

function rgbToHex(rgb) {
    // Extract the individual RGB components
    const components = rgb.match(/\d+/g);
    const r = parseInt(components[0]);
    const g = parseInt(components[1]);
    const b = parseInt(components[2]);
  
    // Convert each component to its hexadecimal representation
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');
  
    // Combine the hex values
    const hex = `#${hexR}${hexG}${hexB}`;
  
    return hex;
  }

  
function getCanvasDims() {

    const canvasRect = canvas.getBoundingClientRect();
    const canvasTop = canvasRect.top; 
    const canvasLeft = canvasRect.left; 
    const canvasBottom = canvasRect.bottom; 
    const canvasRight = canvasRect.right; 

    const canvasHeight = canvasBottom - canvasTop;
    const canvasWidth = canvasRight - canvasLeft;

    const pixelsPerRow = pixelSlider.value;
    const pixelSize = canvasWidth/pixelsPerRow;
    const numberOfRows = Math.floor(canvasHeight/pixelSize);

    console.log(pixelsPerRow, numberOfRows)

    return {pixelsPerRow, numberOfRows, pixelSize}
}


function clearCanvas() {

    canvas.innerHTML = '';
}

function drawCanvas() {
    clearCanvas()

    const {pixelsPerRow, numberOfRows, pixelSize} = getCanvasDims();
    console.log(pixelsPerRow, numberOfRows)

    for (let i = 0; i < numberOfRows; i++) {
        const row = document.createElement('div');
        row.className = 'pixel-row';
        // canvas.appendChild(row);
        for (let i = 0; i < pixelsPerRow; i++) {

            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.width = `${pixelSize}px`;
            pixel.style.height = `${pixelSize}px`;
            pixel.style.backgroundColor = canvasColor;
            
            pixel.addEventListener('mouseover', () => {
                if (rgbToHex(pixel.style.backgroundColor) === canvasColor) {
                    console.log('match!');
                }

                if (drawing){

                    pixel.style.backgroundColor = color;
                }
                
            })
            row.appendChild(pixel);
        }
        canvas.appendChild(row);
    }

}


function changeCanvasColor() {

    const newColor = canvasColorPicker.value;
    console.log(newColor);

    const pixels = document.getElementsByClassName('pixel');

    for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    if (rgbToHex(pixel.style.backgroundColor) === canvasColor) {

        pixel.style.backgroundColor = newColor;

    }
    
    }
    canvasColor = newColor;


}

canvasColorPicker.addEventListener("change", () => {
    changeCanvasColor();
})


pixelSlider.addEventListener("change", () => {
    drawCanvas();
})


window.addEventListener('resize', function() {
    // Code to be executed when the window size changes
    console.log('Window size changed');
    drawCanvas();
  });

  
drawCanvas();