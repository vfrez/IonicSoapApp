export default function xmlToJson(xml) {
	
	// Create the return object
    let obj = {};
    let limpar = ''
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
           
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
            } else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    //Limpar os objetos
    limpar = JSON.stringify(obj)
    limpar = limpar.replace(':Envelope', '')
    limpar = limpar.replace('-ENV', '')
    limpar = limpar.replace('-ENV:Body', '')
    limpar = limpar.replace(':requisicaoResponse', '')
    limpar = limpar.replace('#', '')
    limpar = limpar.replace('@', '')
    obj = JSON.parse(limpar)
    //obj = limpar//.SOAP.SOAP.NS1.return
    //console.log(obj)
	return obj;
}