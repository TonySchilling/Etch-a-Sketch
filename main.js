let drawing = false;
const colorPicker = document.getElementById('colorPicker');
let color = '#000000'


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
const canvasRect = canvas.getBoundingClientRect();


const canvasTop = canvasRect.top; // Top position of the canvas div
const canvasLeft = canvasRect.left; // Left position of the canvas div
const canvasBottom = canvasRect.bottom; 
const canvasRight = canvasRect.right; 

const canvasHeight = canvasBottom-canvasTop;
const canvasWidth = canvasRight - canvasLeft;

console.log(canvasTop, canvasLeft);
console.log(canvasBottom, canvasRight);

console.log(canvasWidth, canvasHeight);

const pixelsPerRow =50;
const pixelSize = canvasWidth/pixelsPerRow;
const numberOfRows = Math.floor(canvasHeight/pixelSize);

console.log(pixelSize);
console.log(numberOfRows);

for (let i = 0; i < numberOfRows; i++) {
    const row = document.createElement('div');
    row.className = 'pixel-row';
    // canvas.appendChild(row);
    for (let i = 0; i < pixelsPerRow; i++) {

        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;
        pixel.addEventListener('mouseover', () => {
            if (drawing){

                pixel.style.backgroundColor = color;
            }
            
        })
        row.appendChild(pixel);
    }
    canvas.appendChild(row);
  }
