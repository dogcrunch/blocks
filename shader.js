const vertexShaderDefault = `
precision mediump float;
attribute vec2 vertPosition;
attribute vec2 uv;
varying vec2 fragTexCoord;
uniform mat4 mWorld;
uniform mat4 mProj;
uniform mat4 mView;

void main()
{
    fragTexCoord = uv;
    gl_Position = mProj * mView * mWorld *vec4(vertPosition, -1.0, 1.0);
}
`
const fragmentShaderDefault = `
precision mediump float;
varying vec2 fragTexCoord;
uniform sampler2D mainTex;
void main()
{
    gl_FragColor = texture2D(mainTex,fragTexCoord);
}
`

const CreateShaderProgram = function(gl, vertexShaderText = vertexShaderDefault, fragmentShaderText = fragmentShaderDefault)
{
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS))
    {
        console.error("Failed to compile vertex shader", gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS))
    {
        console.error("Failed to compile fragment shader", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error("Failed to link program", gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    {
        console.error("Failed to validate program", gl.getProgramInfoLog(program));
        return;
    }
    return program;
}