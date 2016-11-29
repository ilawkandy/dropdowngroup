jQuery(function () {    

    $.fn.dropdowngroup = function(options = []) {

        /*Settings for this element*/
        var defaults = {
            /* None i could think of :'( */
        };

        var settings = $.extend( {}, defaults, options );

        $(this).find(".dropdowngroup-content").hide();

        var selectOptions = [];

        $(this).find(".dropdowngroup-select option").each(function() {

            var selected = ($(this).hasAttr("selected")) ? true : false;
            var optVal = {
                value: $(this).attr("value"),
                text: $(this).text(),
                selected: selected
            };

            selectOptions.push(optVal);
        });

        var data = {
            input: {
                name : $(this).find(".dropdowngroup-input").attr("name"),
                value : $(this).find(".dropdowngroup-input").val(),
            },
            select: {
                name: $(this).find(".dropdowngroup-select").attr("name"),
                title: $(this).find(".dropdowngroup-select").data("title"),
                options: selectOptions,
            }
        };

        //Delete previous input elements to prevent any conflicts
        $(this).find(".dropdowngroup-input").remove();
        $(this).find(".dropdowngroup-select").remove();


        function getHtmlData(data) {

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
            <div class="input-group input-drowdown">
                <input type="text" name="`+input.name+`" class="form-control dropdowngroup-input-value">
                <input type="hidden" class="dropdowngroup-select-value" name="`+select.name+`" value="">
                <div class="input-group-btn">
                    <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light input-drowdown-title" data-toggle="dropdown" aria-expanded="false">
                    <span class="input-drowdown-text">`+input.title+`</span>
                    <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu input-drowdown-menu" role="menu">
                        `+optionsHtml+`
                    </ul>
                </div>            
            </div>
            `;

            return inputHtml;
        }
        
        var htmlData = getHtmlData(data);

        $(this).append(htmlData);
        return this;
    }

    /** Functionality for changing dropdown **/
    $('body').on("click", ".input-drowdown-menu li",  function(e) {

        var clickedItem = $(e.currentTarget);
        var clickedItemText = clickedItem.find("a").text();
        var clickedItemVal = clickedItem.find("a").data("value");

        $(".input-drowdown-title .input-drowdown-text").text(clickedItemText);
        $(".input-drowdown input.dropdowngroup-select-value").val(clickedItemVal);
    });

    $.each($(".dropdowngroup"), function() {

        $(this).dropdowngroup();    
    });

});
