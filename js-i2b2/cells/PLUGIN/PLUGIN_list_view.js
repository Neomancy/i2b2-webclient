i2b2.PLUGIN.view.list = {};
i2b2.PLUGIN.view.list.category = {
    ALL: "ALL"
};
i2b2.PLUGIN.view.list.mode = {
    DETAIL:  "DETAIL",
    SUMMARY: "SUMMARY"
};

i2b2.PLUGIN.view.list.buildListCategory = function() {

    let pluginsListCategories = [i2b2.PLUGIN.view.list.category.ALL];
    // loop through all plugins in the framework
    let pluginsLoaded = i2b2.PLUGIN.model.plugins;
    for (let pluginName in pluginsLoaded) {
        let pluginRef = pluginsLoaded[pluginName];
        pluginRef.category.forEach(category => {
            if(pluginsListCategories.indexOf(category) === -1) {
                pluginsListCategories.push(category);
            }
        });
    }

    pluginsListCategories.sort();
    return pluginsListCategories;
};

i2b2.PLUGIN.view.list.buildListData = function(mode, category, searchString){
    let xIconVarName = 'size32x32';
    if(mode === i2b2.PLUGIN.view.list.mode.SUMMARY){
        xIconVarName = 'size16x16';
    }

    let pluginsListData = [];
    // loop through all plugins in the framework
    let pluginsLoaded = i2b2.PLUGIN.model.plugins;
    for (let pluginName in pluginsLoaded) {
        let pluginRef = pluginsLoaded[pluginName];
        if ((!searchString || (searchString && (
                pluginRef.title.toLowerCase().includes(searchString.toLowerCase())
            || pluginRef.description.toLowerCase().includes(searchString.toLowerCase()))))
            && (!category
            || category === i2b2.PLUGIN.view.list.category.ALL
            || pluginRef.category.indexOf(category) !== -1)) {
            let pluginRecord = {};
            // change the entry id
            pluginRecord.id = pluginName;
            pluginRecord.name = "pluginViewList-"+pluginName;
            // change the plugin's icon
            if (pluginRef.icons && pluginRef.icons[xIconVarName]) {
                const loc = pluginName.replaceAll('.', '/');
                pluginRecord.iconSrc = "plugins/" + loc + "/" + pluginRef.assetDir + "/" + pluginRef.icons[xIconVarName];

            } else {
                pluginRecord.iconSrc = i2b2.PLUGIN.cfg.config.assetDir + i2b2.PLUGIN.cfg.config.defaultListIcons[xIconVarName];
            }

            // change name and description
            if (pluginRef.title) {
                pluginRecord.title = pluginRef.title;
            }

            if (pluginRef.description) {
                pluginRecord.description = pluginRef.description;
            } else {
                pluginRecord.description = "<I>No description available.</I>";
            }

            pluginsListData.push(pluginRecord);
        }
    }

    return pluginsListData;
};

i2b2.PLUGIN.view.list.load = function(template){
    let pluginListCategory = i2b2.PLUGIN.view.list.buildListCategory();
    let pluginTemplateData = {"pluginCategory": pluginListCategory};
    let pluginListing = $("<div id='pluginListWrapper'></div>");
    $("body").append(pluginListing);
    let pluginTemplate = Handlebars.compile(template);
    $(pluginTemplate(pluginTemplateData)).appendTo(pluginListing);

    $.ajax("js-i2b2/cells/PLUGIN/templates/PluginListing.html", {
        success: (template) => {
            i2b2.PLUGIN.view.list.pluginListTemplate = Handlebars.compile(template);
            i2b2.PLUGIN.view.list.changeListMode(i2b2.PLUGIN.view.list.mode.DETAIL);
        },
        error: (error) => { console.error("Could not retrieve template: PluginListing.html"); }
    });
};

i2b2.PLUGIN.view.list.filterByCategory = function(category){
    let listMode = $("#pluginListMode").val();
    i2b2.PLUGIN.view.list.renderList(listMode, category);
};

i2b2.PLUGIN.view.list.changeListMode = function(listMode){
    let category =  $("#pluginCategory").val();
    i2b2.PLUGIN.view.list.renderList(listMode, category);
};

i2b2.PLUGIN.view.list.renderList = function(listMode, category, searchString){

    let pluginsListData = i2b2.PLUGIN.view.list.buildListData(listMode, category, searchString);

    let pluginTemplateData = {
        "pluginDetail": pluginsListData
    };

    if(listMode === i2b2.PLUGIN.view.list.mode.SUMMARY){
        pluginTemplateData = {
            "pluginSummary": pluginsListData
        };
    }

    let pluginList = $("#pluginList");
    pluginList.empty();
    $(i2b2.PLUGIN.view.list.pluginListTemplate(pluginTemplateData)).appendTo(pluginList);
};

i2b2.PLUGIN.view.list.loadPlugin= function(pluginId){
    $("#pluginListMain").offcanvas("hide");
    i2b2.PLUGIN.view.list.resetSearchPluginList();
    i2b2.PLUGIN.view.newInstance(pluginId);
};

i2b2.PLUGIN.view.list.resetSearchPluginList= function(){
    $("#pluginListMode").val(i2b2.PLUGIN.view.list.mode.DETAIL);
    $("#pluginCategory").val(i2b2.PLUGIN.view.list.category.ALL);
    $("#pluginSearchText").val("");
    i2b2.PLUGIN.view.list.renderList(i2b2.PLUGIN.view.list.mode.DETAIL, i2b2.PLUGIN.view.list.category.ALL);
};

i2b2.PLUGIN.view.list.searchPluginList= function(){
    let category =  $("#pluginCategory").val();
    let listMode = $("#pluginListMode").val();
    let searchString = $("#pluginSearchText").val();
    i2b2.PLUGIN.view.list.renderList(listMode, category, searchString);
};


// ================================================================================================== //
i2b2.events.afterLogin.add(
    (function() {
        $.ajax("js-i2b2/cells/PLUGIN/templates/PluginListingContainer.html", {
            success: (template) => {
              i2b2.PLUGIN.view.list.load(template);
            },
            error: (error) => { console.error("Could not retrieve template: PluginListingContainer.html"); }
        });
    })
);