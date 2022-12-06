function initVerticesCoord(){
    let coords = [];
    
    let coord0 = {};
    coord0.x = 100;
    coord0.y = 300;
    coords.push(coord0);

    let coord1 = {};
    coord1.x = 250;
    coord1.y = 100;
    coords.push(coord1);

    let coord2 = {};
    coord2.x = 500;
    coord2.y = 100;
    coords.push(coord2);

    let coord3 = {};
    coord3.x = 750;
    coord3.y = 100;
    coords.push(coord3);

    let coord4 = {};
    coord4.x = 900;
    coord4.y = 300;
    coords.push(coord4);

    let coord5 = {};
    coord5.x = 750;
    coord5.y = 500;
    coords.push(coord5);

    let coord6 = {};
    coord6.x = 500;
    coord6.y = 500;
    coords.push(coord6);

    let coord7 = {};
    coord7.x = 250;
    coord7.y = 500;
    coords.push(coord7);

    let coord8 = {};
    coord8.x = 500;
    coord8.y = 300;
    coords.push(coord8);
    return coords;
}


function drawVertices(){
    let coords = initVerticesCoord();

    for (let i = 0; i < coords.length; i++){
        var canvas = document.getElementById("container");
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.fillText(i+"", coords[i].x, coords[i].y);
        ctx.arc(coords[i].x, coords[i].y, 10, 0, 2*Math.PI);
        ctx.stroke();
    }
}


function drawLines(){
    let coords = initVerticesCoord();
    let allNonDupEdges = getNonDuplicateEdges();
    for (let i = 0; i < allNonDupEdges.length; i++){
        for (let j = 0; j < allNonDupEdges[i].length; j++){
            // draw edge
            let secondV = allNonDupEdges[i][j];
            var canvas = document.getElementById("container");
            var ctx = canvas.getContext("2d");
            ctx.lineWidth = 1;

            ctx.beginPath();

            ctx.strokeStyle = "black";
            ctx.moveTo(coords[i].x, coords[i].y);
            ctx.lineTo(coords[secondV].x , coords[secondV].y);
            ctx.stroke();
        }
    }
}

function getNonDuplicateEdges(){
    let edges = edgeWeights;
    let nonDupEdges = [];
    for (let i = 0; i < edges.length; i++){
        let exists = [];

        for (let j = i; j < edges.length; j++){
            if (edges[i][j] != 0){
                exists.push(j)
            }
        }
        nonDupEdges[i] = exists;
    }
    return nonDupEdges;
}


function drawShortestPath(theShortestPath){
    let coords = initVerticesCoord();
    
    let endIndex = theShortestPath.length-1;

    for (let i = 0; i < endIndex; i++){
        let vertex = theShortestPath[i];
        let nextVertex = theShortestPath[i+1];
        var canvas = document.getElementById("container");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.moveTo(coords[vertex].x, coords[vertex].y);
        ctx.lineTo(coords[nextVertex].x , coords[nextVertex].y);
        ctx.stroke();
        
    }

}


function clearCanvas(){
    let c = document.getElementById("container");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 1000, 600);
}