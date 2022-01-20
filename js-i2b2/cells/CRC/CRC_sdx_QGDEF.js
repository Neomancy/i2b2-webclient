/**
 * @projectDescription	The SDX controller library for the Query Group Definition data-type.
 * @namespace	i2b2.sdx.TypeControllers.QGDEF
 * @inherits 	i2b2.sdx.TypeControllers
 * @author		Nick Benik, Griffin Weber MD PhD
 * @version 	1.3
 * @see 		i2b2.sdx
 * ----------------------------------------------------------------------------------------
 * updated 9-15-08: RC4 launch [Nick Benik]
 */
console.group('Load & Execute component file: CRC > SDX > Query Group DEFinition');
console.time('execute time');


i2b2.sdx.TypeControllers.QGDEF = {};
i2b2.sdx.TypeControllers.QGDEF.model = {};
// *********************************************************************************
//	ENCAPSULATE DATA
// *********************************************************************************
i2b2.sdx.TypeControllers.QGDEF.getEncapsulateInfo = function() {
    // this function returns the encapsulation head information
    return {sdxType: 'QGDEF', sdxKeyName: 'key', sdxControlCell:'CRC', sdxDisplayNameKey: 'QGDEF_name'};
}

// *********************************************************************************
//	GENERATE HTML (DEFAULT HANDLER)
// *********************************************************************************
i2b2.sdx.TypeControllers.QGDEF.RenderHTML= function(sdxData, options, targetDiv) {
    console.warn("[i2b2.sdx.TypeControllers.QGDEF.RenderHTML] is deprecated!");
    // OPTIONS:
    //	title: string
    //	showchildren: true | false
    //	cssClass: string
    //	icon: [data object]
    //		icon: 		(filename of img, appended to i2b2_root+cellDir + '/assets')
    //		iconExp: 	(filename of img, appended to i2b2_root+cellDir + '/assets')
    //	dragdrop: string (function name)
    //	context: string
    //	click: string
    //	dblclick: string

    if (Object.isUndefined(options)) { options = {}; }
    var render = {html: retHtml, htmlID: id};
    var id = "CRC_ID-" + i2b2.GUID();

    // process drag drop controllers1
    if (!Object.isUndefined(options.dragdrop)) {
// NOTE TO SELF: should attachment of node dragdrop controller be handled by the SDX system as well? 
// This would ensure removal of the onmouseover call in a cross-browser way
        var sDD = '  onmouseover="' + options.dragdrop + '(\''+ targetDiv.id +'\',\'' + id + '\')" ';
    } else {
        var sDD = '';
    }

    if (Object.isUndefined(options.cssClass)) { options.cssClass = 'sdxDefaultQGDEF';}

    // user can override
    bCanExp = true;
    if (Object.isBoolean(options.showchildren)) {
        bCanExp = options.showchildren;
    }
    render.canExpand = bCanExp;
    render.iconType = "QGDEF";

    if (!Object.isUndefined(options.icon)) { render.icon = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.icon }
    if (!Object.isUndefined(options.iconExp)) { render.iconExp = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.iconExp }
    // in cases of one set icon, copy valid icon to the missing icon
    if (Object.isUndefined(render.icon) && !Object.isUndefined(render.iconExp)) {	render.icon = render.iconExp; }
    if (!Object.isUndefined(render.icon) && Object.isUndefined(render.iconExp)) {	render.iconExp = render.icon; }

    // handle the event controllers
    var sMainEvents = sDD;
    var sImgEvents = sDD;

    // **** Render the HTML ***
    var retHtml = '<DIV id="' + id + '" ' + sMainEvents + ' style="white-space:nowrap;cursor:pointer;">';
    retHtml += '<DIV ';
    if (Object.isString(options.cssClass)) {
        retHtml += ' class="'+options.cssClass+'" ';
    } else {
        retHtml += ' class= "sdxDefaultQGDEF" ';
    }
    retHtml += sImgEvents;
    retHtml += '>';
    retHtml += '<IMG src="'+render.icon+'"/> ';
    if (!Object.isUndefined(options.title)) {
        retHtml += options.title;
    } else {
        console.warn('[SDX RenderHTML] no title was given in the creation options for an CRC > QGDEF node!');
        retHtml += ' QGDEF '+id;
    }
    retHtml += '</DIV></DIV>';
    render.html = retHtml;
    render.htmlID =  id;
    var retObj = {};
    $.extend(retObj, sdxData);
    retObj.renderData = render;
    return retObj;
}





// *********************************************************************************
//	ATTACH DRAG TO DATA (DEFAULT HANDLER)
// *********************************************************************************
i2b2.sdx.TypeControllers.QGDEF.AttachDrag2Data = function(divParentID, divDataID){
    if (Object.isUndefined($(divDataID))) {	return false; }

    // get the i2b2 data from the yuiTree node
    var tvTree = YAHOO.widget.TreeView.getTree(divParentID);
    var tvNode = tvTree.getNodeByProperty('nodeid', divDataID);
    if (!Object.isUndefined(tvNode.DDProxy)) { return true; }

    // attach DD
    var t = new i2b2.sdx.TypeControllers.QGDEF.DragDrop(divDataID)
    t.yuiTree = tvTree;
    t.yuiTreeNode = tvNode;
    tvNode.DDProxy = t;

    // clear the mouseover attachment function
    var tdn = $(divDataID);
    if (!Object.isUndefined(tdn.onmouseover)) {
        try {
            delete tdn.onmouseover;
        } catch(e) {
            tdn.onmouseover;
        }
    }
    if (!Object.isUndefined(tdn.attributes)) {
        for (var i=0;i<tdn.attributes.length; i++) {
            if (tdn.attributes[i].name=="onmouseover") {
                try {
                    delete tdn.onmouseover;
                } catch(e) {
                    tdn.onmouseover;
                }
            }
        }
    }
}




// *********************************************************************************
//	DRAG DROP PROXY CONTROLLER
// *********************************************************************************
i2b2.sdx.TypeControllers.QGDEF.DragDrop = function(id, config) {
    if (id) {
        this.init(id, 'QGDEF',{isTarget:false});
        this.initFrame();
    }
    var s = this.getDragEl().style;
    s.borderColor = "transparent";
    s.opacity = 0.75;
    s.filter = "alpha(opacity=75)";
    s.whiteSpace = "nowrap";
    s.overflow = "hidden";
    s.textOverflow = "ellipsis";
};

/* TODO: Reimplement drag and drop */


// *********************************************************************************
//	<BLANK> DROP HANDLER 
//	!!!! DO NOT EDIT - ATTACH YOUR OWN CUSTOM ROUTINE USING
//	!!!! THE i2b2.sdx.Master.setHandlerCustom FUNCTION
// *********************************************************************************
i2b2.sdx.TypeControllers.QGDEF.DropHandler = function(sdxData) {
    alert('[PatientRecord DROPPED] You need to create your own custom drop event handler.');
}
// ==========================================================================
i2b2.sdx.TypeControllers.QGDEF.dragStartHandler = function(i2b2Data) {
    delete i2b2Data.origData.xmlOrig;
    delete i2b2Data.origData.parent;
    delete i2b2Data.renderData.idDOM;
    return i2b2Data;
};

// *********************************************************************************
//	DEPRECATED FUNCTIONS
// *********************************************************************************
i2b2.sdx.TypeControllers.QGDEF.AppendTreeNode = function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.AppendTreeNode] is deprecated!"); }
i2b2.sdx.TypeControllers.QGDEF.SaveToDataModel = function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.SaveToDataModel] is deprecated!"); }
i2b2.sdx.TypeControllers.QGDEF.LoadFromDataModel = function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.LoadFromDataModel] is deprecated!"); }
i2b2.sdx.TypeControllers.QGDEF.ClearAllFromDataModel= function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.ClearAllFromDataModel] is deprecated!"); }
i2b2.sdx.TypeControllers.QGDEF.onHoverOver = function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.onHoverOver] is deprecated!"); }
i2b2.sdx.TypeControllers.QGDEF.onHoverOut = function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.onHoverOut] is deprecated!"); }
i2b2.sdx.TypeControllers.QGDEF.AttachDrag2Data = function() { console.error("[i2b2.sdx.TypeControllers.QGDEF.AttachDrag2Data] is deprecated!"); }

console.timeEnd('execute time');
console.groupEnd();