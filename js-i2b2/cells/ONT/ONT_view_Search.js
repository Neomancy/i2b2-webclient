/**
 * @projectDescription	View controller for ONT's "Term Search" .
 * @inherits 	i2b2.ONT.view
 * @namespace	i2b2.ONT.view.search
 * @author		Marc-Danie
 * @version 	2.0
 * ----------------------------------------------------------------------------------------
 */
i2b2.ONT.view.search = {};

i2b2.ONT.view.search.template = {};
i2b2.ONT.view.search.error = {};
i2b2.ONT.view.search.error.minCharError = "Search term must be at least 3 characters.";

i2b2.ONT.view.search.toggleSearchOptions = function(elem){
    let currentVal = $(elem).val();
    if(currentVal === "coding"){
        $("#categoryOptions").addClass("hidden");
        $("#codingOptions").removeClass("hidden");
    }
    else{
        $("#categoryOptions").removeClass("hidden");
        $("#codingOptions").addClass("hidden");
    }
};
//================================================================================================== //
i2b2.ONT.view.search.handleSearchInputChange = function(newValue){
    i2b2.ONT.view.search.toggleSearchClearIcon(newValue);
    i2b2.ONT.view.search.enableSearch(newValue);
}
//================================================================================================== //

i2b2.ONT.view.search.enableSearch = function(newValue){
    if(newValue && newValue.length > 2) {
        $("#submitTermSearch").attr('disabled', false);
    }else{
        $("#submitTermSearch").attr('disabled', true);
    }
};

//================================================================================================== //

i2b2.ONT.view.search.toggleSearchClearIcon = function(newValue){
    if(newValue){
        $("#searchTerm .clearIcon").removeClass("hidden");
    } else{
        $("#searchTerm .clearIcon").addClass("hidden");
    }
};

//================================================================================================== //

i2b2.ONT.view.search.clearSearchInput = function(){
    $("#searchTermText").val("");
    $("#searchTerm .clearIcon").addClass("hidden");
    $("#searchTermError").empty();
};

//================================================================================================== //

i2b2.ONT.view.search.initSearch = function(container){
    // Load the finder templatee
    $.ajax("js-i2b2/cells/ONT/assets/OntologyFinder.html", {
        success: (template) => {
            let finderTemplate = Handlebars.compile(template);
            $(finderTemplate({})).prependTo(container);
        },
        error: (error) => { console.error("Could not retrieve template: OntologyFinder.html"); }
    });
};

//================================================================================================== //

i2b2.ONT.view.search.initSearchCatOptions = function(){
    $.ajax("js-i2b2/cells/ONT/templates/OntologyFinderFilterOptions.html", {
        success: (template) => {
            let categoryOptions = Handlebars.compile(template);
            let categories = [];
            for (let i=0; i<i2b2.ONT.model.Categories.length; i++) {
                let cat = i2b2.ONT.model.Categories[i];
                let catVal = cat.key.substring(2,cat.key.indexOf('\\',3))
                categories.push({
                    name: cat.name,
                    value: catVal,
                    filterType: "category"
                });
            }
            let options = {
                "option": categories
            };
            $(categoryOptions(options)).appendTo("#categorySubmenu");

            $("#liCat").hover(function(){
                $("#codingSubmenu").hide().closest("li").removeClass("highlight-menu-item");
                $("#categorySubmenu").css("left", "100%").show();
            });

            $("#liCoding").hover(function(){

                $("#categorySubmenu").hide().closest("li").removeClass("highlight-menu-item");
                $("#codingSubmenu").css("left", "100%").show();
            });

            $(".submenu li").on("click", function(){
                $(".active").removeClass("active");
                let liItem = $(this).find("button");
                let newDisplayText = liItem.addClass("active").text();
                let filterValue = liItem.addClass("active").data("searchFilterValue");
                let filterType = liItem.data("searchFilterType");
                $("#searchFilterText").text(newDisplayText);
                $("#searchFilter").data("selectedFilterValue", filterValue).data("selectedFilterType", filterType);
            });

            $("#searchActions .reset").click(function() {
                $("#searchTermText").val("");
            });

            $('#i2b2FinderOnt .navbar-nav').on('shown.bs.dropdown', function () {
                let navBarMain = $("#i2b2FinderOnt .navbarMain .active")
                let parentMenu = navBarMain.closest(".submenu").closest("li");
                navBarMain.closest(".submenu").each(function(){
                    $(this).css("left", parentMenu.width());
                    $(this).show();
                }).closest("li").addClass("highlight-menu-item");
            });
        },
        error: (error) => { console.error("Could not retrieve template: OntologyFinderFilterOption.html"); }
    });

    $('#i2b2FinderOnt .navbar-nav').on('show.bs.dropdown', function () {
        $(".submenu").hide();
        $("#i2b2FinderOnt .navbarMain .active").closest(".submenu").each(function(){
            $(this).show();
        }).closest("li").addClass("highlight-menu-item");
    });
};

//================================================================================================== //

i2b2.ONT.view.search.initCodingSysOptions = function(){
    $.ajax("js-i2b2/cells/ONT/templates/OntologyFinderFilterOptions.html", {
        success: (template) => {
            let codingSystemOptions = Handlebars.compile(template);
            let codingSystems = [];
            for (let i=0; i<i2b2.ONT.model.Schemes.length; i++) {
                let cat = i2b2.ONT.model.Schemes[i];
                codingSystems.push({
                    name: cat.name,
                    value: cat.key,
                    filterType: "coding"
                });
            }
            let options = {
                "option": codingSystems
            };
            $(codingSystemOptions(options)).appendTo("#codingSubmenu");
        },
        error: (error) => { console.error("Could not retrieve template: OntologyFinderCodingOptions.html"); }
    });
}
//================================================================================================== //