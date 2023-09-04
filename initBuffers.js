const VertexBuffer=function(gl, data)
{
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    return vbo;
}

const IndexBuffer=function(gl, data)
{
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data),gl.STATIC_DRAW);
    return ibo;
}

const BindIndexBuffer=function(gl, ibo)
{
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
}

const BindVertexBuffer=function(gl, vbo)
{
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
}