
const main = function()
{
    console.log("hello world")

    var canvas = document.getElementById("game");
    var gl = canvas.getContext("webgl");
    if (!gl) canvas.getContext("experiemental-webgl")

    gl.clearColor(0.5,0.5,0.5,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var go = new GameObject(gl);
    
    var pos = [0,0,0];

    var projMat = new Float32Array(16);
    var viewMat = new Float32Array(16);
    var aspect = canvas.width/canvas.height;
    var size = 5;
    
    glMatrix.mat4.identity(viewMat);
    glMatrix.mat4.ortho(projMat, -aspect*size, aspect*size, -size, size, 0.01, 1000);
    go.Draw(viewMat,projMat);
}