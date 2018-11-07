var eleContainer = document.getElementById('container');
var eleLoading = document.getElementById('loading');
var store = {length: 0,min:0,max:0};
var index =0;

var InitParameter = function (imagArray){
    maxLength = imagArray[1] - imagArray[0] + 1;
    store.min = imagArray[0]
    store.max = imagArray[1]    
    index = imagArray[0]    
}

var LoadImages =function( imagArray,urlRoot ){
    
    InitParameter(imagArray)

	for ( var start = store.min; start <= store.max; start++) {
    (function (index) {
        var img = new Image();
        img.onload = function () {
            store.length++;            
            store[index] = this;
            Play();
        };
        img.onerror = function () {
            store.length++;
            Play();
        };
        img.src = urlRoot + index + '.png';
    })(start);
	}
}

var Play = function () {

	var percent = Math.round(100 * store.length / maxLength);
	eleLoading.setAttribute('data-percent', percent);
	eleLoading.style.backgroundSize = percent + '% 100%';    
	if (percent == 100) {
		
		eleContainer.innerHTML = ''; 
		var step = function () {
			if (store[index - 1]) {
				eleContainer.removeChild(store[index - 1]);
			}
			eleContainer.appendChild(store[index]);
			index++;
			if (index > store.max)
				index = store.min
			setTimeout(step, 42)
		}
		step()
	}
};