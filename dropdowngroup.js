/**
 * A jQuery plugin for input-group style dropdown-group.
 * Author: Hillar Kapsta
 */

;(function($) {
    
    var pluginName = 'dropdowngroup';

    function Plugin(element, options) {

        var el = element;
        var $el = $(element);

        var title = $el.find(".dropdowngroup-select").data("title");
        var defaultValue = "";
        var defaultTitle = "";
        var defaultValueSet = false;

        options = $.extend({}, $.fn[pluginName].defaults, options);

        function init() {

            // Add any initialization logic here...                        

            $el.find(".dropdowngroup-content").hide();

            var selectOptions = [];

            $el.find(".dropdowngroup-select option").each(function() {               

                if (defaultValueSet == false) {   

                    defaultValue = $(this).attr("value");

                    defaultTitle = $(this).text();
                    defaultValueSet = true;
                }

                var selected = ($(this).attr("selected")) ? true : false;
                var optVal = {
                    value: $(this).attr("value"),
                    text: $(this).text(),
                    selected: selected
                };

                selectOptions.push(optVal);
            });

            var data = {
                input: {
                    name : $el.find(".dropdowngroup-input").attr("name"),
                    value : $el.find(".dropdowngroup-input").val(),
                },
                select: {
                    name: $el.find(".dropdowngroup-select").attr("name"),
                    title: ($el.find(".dropdowngroup-select").data("title")) ? $el.find(".dropdowngroup-select").data("title") : defaultTitle ,
                    options: selectOptions,
                }
            };

            //Delete previous input elements to prevent any conflicts
            $el.find(".dropdowngroup-input").remove();
            $el.find(".dropdowngroup-select").remove();

            var optionsHtml = "";
            var select = data.select;
            var input = data.input;

            input.title = (input.title) ? input.title : "";

            for (var i = select.options.length - 1; i >= 0; i--) {

                var active = (select.options[i].selected) ? "active" : "";

                optionsHtml = optionsHtml + `
                    <li role="presentation" class="`+active+`">
                        <a data-value="`+select.options[i].value+`" role="menuitem">`+select.options[i].text+`</a>
                    </li>
                `;                
            }
            
            var inputHtml = `
            <div class="input-group input-dropdown">
                <input type="text" name="`+input.name+`" class="form-control dropdowngroup-input-value">                
                <div class="input-group-btn">
                    <input type="hidden" class="dropdowngroup-select-value" name="`+select.name+`" value="`+defaultValue+`">
                    <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light input-dropdown-title" data-toggle="dropdown" aria-expanded="false">
                    <span class="input-dropdown-text">`+select.title+`</span>
                    <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu input-dropdown-menu" role="menu">
                        `+optionsHtml+`
                    </ul>
                </div>            
            </div>
            `;

            $el.append(inputHtml);              

            hook('onInit');
        }

        function refresh() {

            var itemVal = $el.find(".dropdowngroup-select-value").val(); 
            var clickedItem = $el.find("li a[data-value='"+itemVal+"']").parent();
            var clickedDropdown = clickedItem.parentsUntil(".input-dropdown");
            
            var clickedItemText = clickedItem.find("a").text();
            var clickedItemVal = clickedItem.find("a").data("value");

            if (clickedItemText)
                clickedDropdown.find(".input-dropdown-text").text(clickedItemText);    
            else    
                clickedDropdown.find(".input-dropdown-text").text(defaultTitle);  

            if (itemVal) {

            } else {
                $el.find(".dropdowngroup-select-value").val(defaultValue); 
            }

        }

        function clear() {


            $el.find(".input-dropdown-text").text(defaultTitle);
            $el.find("input.dropdowngroup-select-value").val(defaultValue);   
        }

        function option (key, val) {

            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        function destroy() {

            $el.each(function() {
                var el = this;
                var $el = $(this);

                // Add code to restore the element to its original state...

                hook('onDestroy');
                $el.removeData('plugin_' + pluginName);                
            });
        }

        function hook(hookName) {
            if (options[hookName] !== undefined) {
                options[hookName].call(el);
            }
        }

        init();

        return {
            option: option,
            destroy: destroy,
            refresh: refresh,
            clear: clear,
        };


    }

    $.fn[pluginName] = function(options) {

        if (typeof arguments[0] === 'string') {

            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;

            this.each(function() {

                if ($.data(this, 'plugin_' + pluginName) && 
                    typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') 
                {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                }

                /* else { //Error something. Gets 2 this objects 

                    throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
                }  */ 
            });

            if (returnVal !== undefined){

                return returnVal;
            } else {

                return this;
            }

        } else if (typeof options === "object" || !options) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        onInit: function() {},
        onDestroy: function() {}
    };

    /** Functionality for changing dropdown **/
    $('body').on("click", ".input-dropdown-menu li",  function(e) {

        var clickedItem = $(e.currentTarget);
        var clickedDropdown = clickedItem.parentsUntil(".input-dropdown");

        var clickedItemText = clickedItem.find("a").text();
        var clickedItemVal = clickedItem.find("a").data("value");

        clickedDropdown.find(".input-dropdown-text").text(clickedItemText);
        clickedDropdown.find("input.dropdowngroup-select-value").val(clickedItemVal);
    });

    $.each($(".dropdowngroup"), function() {

        $(this).dropdowngroup();
    });


})(jQuery);
