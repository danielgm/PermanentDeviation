//  Register onpaste on inputs and textareas in browsers that don't//  natively support it////  from //  http://stackoverflow.com/questions/1226574/disable-copy-paste-into-html-form-using-javascript(function () { var onload = window.onload; window.onload = function () { if (typeof onload == "function") { onload.apply(this, arguments); } var fields = []; var inputs = document.getElementsByTagName("input"); var textareas = document.getElementsByTagName("textarea"); for (var i = 0; i < inputs.length; i++) { fields.push(inputs[i]); } for (var i = 0; i < textareas.length; i++) { fields.push(textareas[i]); } for (var i = 0; i < fields.length; i++) {	 var field = fields[i];	 if (typeof field.onpaste != "function" && !!field.getAttribute("onpaste")) {		 field.onpaste = eval("(function () { " + field.getAttribute("onpaste") + " })");	 }	 if (typeof field.onpaste == "function") {		 var oninput = field.oninput;		 field.oninput = function () {			 if (typeof oninput == "function") {				 oninput.apply(this, arguments);			 }			 if (typeof this.previousValue == "undefined") {				 this.previousValue = this.value;			 }			 var pasted = (Math.abs(this.previousValue.length - this.value.length) > 1 && this.value != "");			 if (pasted && !this.onpaste.apply(this, arguments)) {				 this.value = this.previousValue;			 }			 this.previousValue = this.value;		 };		 if (field.addEventListener) {			 field.addEventListener("input", field.oninput, false);		 } else if (field.attachEvent) {			 field.attachEvent("oninput", field.oninput);		 }	 } } }})();/*function disableselect(e){	return false}function reEnable(){	return true}document.onselectstart=new Function ("return false")document.onmousedown=disableselectdocument.onclick=reEnable*/