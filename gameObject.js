const squareVertices = [
    -0.5, -0.5, 0, 0,
     0.5, -0.5, 1, 0,
     0.5,  0.5, 1, 1,
     -0.5, 0.5, 0, 1
];

var squareIndices = [
    0,1,2,
    0,3,2
];

class Material {
    constructor()
    {
        this.color = [1,1,1];
        this.whirl = 0;
        this.pixelate = 0;
        this.transparency = 0;
    }
}
class GameObject {

    constructor(gl) {
        this.gl = gl;
        this.worldMatrix = glMatrix.mat4.create();
        this.rotation = glMatrix.quat.create();
        this.position = [0,0,0];
        this.scale = [1,1,1];
        this.vbo = VertexBuffer(this.gl, squareVertices);
        this.ibo = IndexBuffer(this.gl, squareIndices);
        this.shader = CreateShaderProgram(this.gl);
        this.material = new Material();
        this.uniformCache = {};
        this.texture = gl.createTexture();
        this.gl.bindTexture(gl.TEXTURE_2D,this.texture);
        this.gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        this.gl.texImage2D(gl.TEXTURE_2D,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("textImage"))
    }

    GetUniformLocation(name)
    {
        if (name in this.uniformCache) return this.uniformCache[name];
        this.uniformCache[name] = this.gl.getUniformLocation(this.shader, name);
        return this.uniformCache[name];
    }

    Draw(viewMat, projMat) {
        glMatrix.mat4.fromRotationTranslationScale(this.worldMatrix, this.rotation, this.position, this.scale);

        BindVertexBuffer(this.gl, this.vbo);
        BindIndexBuffer(this.gl, this.ibo);

        var positionAttribLoc = this.gl.getAttribLocation(this.shader, "vertPosition");
        this.gl.vertexAttribPointer(
            positionAttribLoc,
            2,
            this.gl.FLOAT,
            false,
            4 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        var uvAttribLoc = this.gl.getAttribLocation(this.shader, "uv");
        this.gl.vertexAttribPointer(
            uvAttribLoc,
            2,
            this.gl.FLOAT,
            false,
            4 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );
        this.gl.enableVertexAttribArray(positionAttribLoc);
        this.gl.enableVertexAttribArray(uvAttribLoc);

        this.gl.useProgram(this.shader);
        this.gl.uniformMatrix4fv(this.GetUniformLocation("mWorld"), this.gl.FALSE, this.worldMatrix);
        this.gl.uniformMatrix4fv(this.GetUniformLocation("mView"), this.gl.FALSE, viewMat);
        this.gl.uniformMatrix4fv(this.GetUniformLocation("mProj"), this.gl.FALSE, projMat);
        this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    }
}