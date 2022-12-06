vertices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let edgeWeights = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
              [ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
              [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
              [ 0, 0, 7, 0, 9, 14, 0, 0, 0],
              [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
              [ 0, 0, 4, 14, 10, 0, 2, 0, 0],
              [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
              [ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
              [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ];

let graph = [
    [1, 7], // vertex 0's neigbours
    [0, 7, 2],
    [1, 8, 5, 3],
    [2, 5, 3],
    [3, 5],
    [4, 3, 2, 6],
    [5, 8, 7],
    [6, 8, 1, 0],
    [2, 6, 7]
];

let highways = 
            [ [ false, false, false, false, false, false, false, false, false],
              [ false, false, true, false, false, false, false, false, false],
              [ false, true, false, false, false, false, false, false, false ], // true at (1-2)
              [ false, false, false, false, false, false, false, false, false],
              [ false, false, false, false, false, false, false, false, false],
              [ false, false, false, false, false, false, false, false, false],
              [ false, false, false, false, false, false, false, true, false],
              [ false, false, false, false, false, false, true, false, false ], // true (6-7)
              [ false, false, false, false, false, false, false, false, false]];

let trafficWeights = 
            [ [ 0, 10, 0, 0, 0, 0, 0, 90, 0 ],
              [ 10, 0, 1, 0, 0, 0, 0, 20, 0 ],
              [ 0, 1, 0, 7, 0, 4, 0, 0, 2 ],
              [ 0, 0, 7, 0, 9, 14, 0, 0, 0],
              [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
              [ 0, 0, 4, 14, 10, 0, 2, 0, 0],
              [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
              [ 90, 20, 0, 0, 0, 0, 1, 0, 1],
              [ 0, 0, 2, 0, 0, 0, 6, 1, 0 ] ];

let terrainWeights = 
            [ [ 0, 60, 0, 0, 0, 0, 0, 8, 0 ],
              [ 60, 0, 8, 0, 0, 0, 0, 60, 0 ],
              [ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
              [ 0, 0, 7, 0, 9, 14, 0, 0, 0],
              [ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
              [ 0, 0, 4, 14, 10, 0, 2, 0, 0],
              [ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
              [ 8, 60, 0, 0, 0, 0, 1, 0, 7 ],
              [ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ];

function initEdgeWeights(amt){
    let newGraph = new Array(amt);

    for (let i = 0; i < amt; i++){
        let inner = new Array(amt);
        for (let j = 0; j < amt; j++){
            inner[j] = 0;
        }
        newGraph[i] = inner;
    }
    
    return newGraph;
}


function calcShortestPathFrom(startingPt, vertices, edgeWeights, endPt){
    let size = vertices.length;

    let visited = initVisitArr(size);
    let weights = initDistances(startingPt, size);
    let paths = initPath(startingPt, size);  
    
    // iterate until all vertices are visited
    while (stillUnvisited(visited)){
        let currSmallest = getSmallest(weights, visited);
        let currVertex = currSmallest.vertex;
        let currWeight = currSmallest.weight;
        
        // set vertex to visited
        visited[currVertex] = true;
        
        // iterate every possible edge from current vertex and update weights
        let touchedVertices = visitVertex(currVertex, edgeWeights, currWeight);
        
        for (let i = 0; i < touchedVertices.length; i++){
            let v = touchedVertices[i].vertex;
            let newW = touchedVertices[i].weight;
            if (newW < weights[v]){
                // new weight is less, so update it
                paths[v] = currVertex;
                weights[v] = newW;
            }
        }
    }

    // make proper string paths
    let allPaths = getPathsArr(paths, vertices.length, startingPt);
    // printAllPaths(allPaths);

    //printAPath(allPaths[endPt]);
    //alert(allPaths[endPt]);
    //alert(printAPath(allPaths[endPt]));
    return allPaths[endPt];
    
}


function initVisitArr(amt){
    let visited = [];
    for (let i = 0; i < amt; i++){
        visited[i] = false;
    }
    return visited;
}

function initPath(startingPt, amt){
    let arr = [];
    for (let i = 0; i < amt; i++){
        if (i == startingPt){
            arr[i] = startingPt;
            continue;
        }
        arr[i] = null;
    }
    return arr;
}

function initDistances(startingPt, amt){
    let arr = [];
    for (let i = 0; i < amt; i++){
        if (i == startingPt){
            arr[i] = 0;
        }else {
            arr[i] = Infinity;
        }
    }
    return arr;
}



function stillUnvisited(visited){
    for (let i = 0; i < visited.length; i++){
        if (visited[i] == false){
            return true;
        }
    }
    return false;
}

function getAllUnvisited(visited){
    let theUnvisited = [];
    for (let i = 0; i < visited.length; i++){
        if (!visited[i]){
            theUnvisited.push(i);
        }
    }
    return theUnvisited;
}


function getSmallest(weights, visited){
    let smallestV = null;  
    let smallestW = null;

    for (let i = 0; i < weights.length; i++){
        if (!visited[i]){
            if (smallestV == null){
                smallestV = i;
                smallestW = weights[i];
                continue;
            }
            if (weights[i] < smallestW){
                smallestV = i;
                smallestW = weights[i];
            }
        }
    }
    let smallest = {};
    smallest.vertex = smallestV;
    smallest.weight = smallestW;
    return smallest;
}



// 2D array 
function printEdgeWeights(edgeWeights){
    let size = edgeWeights.length;
    for (let i = 0; i < size; i++){
        for (let j = 0; j < edgeWeights[i].length; j++){
            process.stdout.write(edgeWeights[i][j] + " ");
        }
        console.log();
    }
}



function visitVertex(vertex, weights, pathWeight){
    let size = weights.length;

    let iteratedVertices = [];
    
    for (let i = 0; i < size; i++){
        let currWeight = weights[i][vertex];
        if (currWeight != 0){
            // there is an edge
            let newWeight = pathWeight + currWeight; 
            let temp = {};
            temp.vertex = i;
            temp.weight = newWeight;
            iteratedVertices.push(temp);
        }
    }
    return iteratedVertices;
}


// returns a 2D array of the shortest paths
function getPathsArr(prevPathArr, amt, startingPt){
    let allPaths = [];
    for (let i = 0; i < amt; i++){
        allPaths.push(getAPath(prevPathArr, i, startingPt))
    }
    return allPaths;
}


function getAPath(prevPathArr, vertex, startingPt){
    let path = [];
    let curr = vertex;
    path.push(curr);

    while (curr != startingPt){
        curr = prevPathArr[curr];
        path.push(curr);
    }
    path.reverse();
    return path;
}


function printAllPaths(paths){
    for (let i = 0; i < paths.length; i++){
        printAPath(paths[i]);
    }
}

function printAPath(path){
    let pathStr = "";
    for (let i = 0; i < path.length; i++){
        if (i != path.length-1){
            //process.stdout.write(path[i] + " -> ");
            pathStr += path[i] + " -> ";
            continue;
        }
        //console.log(path[i] + "");
        pathStr += path[i] + "";
    }
    return pathStr;
}


function run(){
    let start = document.getElementById("start-pt-input").value;
    let end = document.getElementById("end-pt-input").value;
    if (start == "" || end == ""){
        alert("Please enter a starting and ending vertex.");
        return;
    }
    if (start < 0 || start > 8 || end < 0 || end > 8){
        alert("Please enter a valid vertex number.");
        return;
    }
    let newWeights = edgeWeights;

    if (document.getElementById("traffic-input").checked){
        // input traffic in weight
        newWeights = addWeights(newWeights, trafficWeights);
    }
    if (document.getElementById("terrain-input").checked){
        newWeights = addWeights(newWeights, terrainWeights);
    }

    let r = calcShortestPathFrom(start, vertices, newWeights, end);
    drawShortestPath(r);
}


function addWeights(w1, w2){
    let newW = init2DArr(w1.length);
    
    for (let i = 0; i < w1.length; i++){
        for (j = 0; j < w1[i].length; j++){
            newW[i][j] = w1[i][j] + w2[i][j];
        }
    }
    return newW;
}



// ----------------------------------  BFS  ---------------------------------- 
function calcShortestPathBFS(graph, startPt, endPt){ // graph is the edges
    
    // all vertices visited status are false
    let visited = initVisitArr(graph.length);
    let path = new Array(graph.length);
    path[startPt] = startPt;
   // return;


    // queue 
    let queue = [startPt];

    while (queue.length > 0){
        let popped = queue.pop();
        visited[popped] = true;
        
        
        if (popped == endPt){
            break;
        }

        // add 'to visit' queue the univisted neighbours of the popped
        let temp = [];
        for (let i = 0; i < graph[popped].length; i++){
            let potentialVertex = graph[popped][i];
            if (!visited[potentialVertex] && !queue.includes(potentialVertex)){
                temp.push(potentialVertex);
                if (path[potentialVertex] == undefined){
                    path[potentialVertex] = popped;
                }
            }
        }
        temp.reverse;
        queue = temp.concat(queue);
    }
    console.log(path);
    // get the actual path
    let actualPath = getActualPathBFS(path, startPt, endPt);
    return actualPath;

}


function init2DArr(amt){
    let arr = new Array(amt);
    for (let i = 0; i < amt; i++){
        arr[i] = [];
    }
    return arr;
}


function getActualPathBFS(path, startPt, endPt){
    let actualPath = [];
    // start at endpt
    let currPt = endPt;
    actualPath.push(currPt);

    while (currPt != startPt){
        // find the parent vertex
        currPt = path[currPt];
        actualPath.push(currPt);
    }
    actualPath.reverse();
    return actualPath;

}

//let r = calcShortestPathBFS(graph, 0, 4);
//console.log(r);

// testing ----------------------------------------------------

// comparing time and paths between Dijkstra and BFS
let begin = performance.now();
let r = calcShortestPathBFS(graph, 3, 6);
let end = performance.now();

console.log(begin);
console.log(end);
console.log("time taken: " + (end-begin));
console.log(r);
console.log();

let begin1 = performance.now()
let r1 = calcShortestPathFrom(3, vertices, edgeWeights, 6);
let end1 = performance.now();
console.log(begin1);
console.log(end1);
console.log("time taken: " + (end1-begin1));
console.log(r1);
