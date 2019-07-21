function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4)
            if(rawFile.status === 200 || rawFile.status === 0) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}