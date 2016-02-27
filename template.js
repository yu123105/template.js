function getHTMLByObjects(template, objs){
    var html = "";
    if(!objs||!template){
        return html;
    }
    if(!objs.length){
        return getHTMLByObject(template, objs);
    }
    for(var i= 0,l=objs.length; i<l; i++){
        var obj = obj[i];
        html += getHTMLByObject(template, obj);
    }
    return html;
}
function getHTMLByObject(template, obj){
    if(!obj||!template){
        return template;
    }
    var tempRepalces = template.match(/\${\S+}/g);
    //需要替换的字符串
    var replaces = [];
    if(tempRepalces){
        //去重复的
        $.each(tempRepalces, function(i, el){
            if($.inArray(el, replaces) === -1) replaces.push(el);
        });
        for(var i,l=replaces.length; i<l; i++){
            var replace = replaces[i];
            var replaceStr = replace.substring(2,replace.length-1);
            //获取属性值
            var value = getPrototypeValueByString(obj, replaceStr);
            template.replace(new RegExp(replace,'gm'), value);
        }
    }
    return template;
}
function getPrototypeValueByString(obj, string){
    if(!obj||!string){
        return;
    }
    var value = "";
    var prototypeStr = string;
    string = string.replace(/ /g, "");
    var tempArr = string.match(/\(\S+\)/g);
    var func;
    if(tempArr){
        var tempPrototypeStr = tempArr[0];
        prototypeStr = tempPrototypeStr.substr(1, tempPrototypeStr.length-2);
        var funcStr = string.replace(/\(\S+\)/g, "");
        func = eval(funcStr);
    }
    var prototypes = prototypeStr.split(".");
    for(var i= 0,l=prototypes.length; i<l; i++){
        var prototype = prototypes[i];
        value = obj[prototype];
        if(!value){
            break;
        }
    }
    if(func){
        value = func(value);
    }
    return value;
}