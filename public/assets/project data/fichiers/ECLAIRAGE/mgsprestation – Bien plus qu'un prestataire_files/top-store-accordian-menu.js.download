(function ($){
    $.fn.ThunkCatMenu = function (options){
        //plugin's default options
        var defaults = {
            resizeWidth: '',
            animationSpeed: 'fast',
            accoridonExpAll: false
        };
        //Variables
        var options = $.extend(defaults, options),
            opt = options,
            $resizeWidth = opt.resizeWidth,
            $animationSpeed = opt.animationSpeed,
            $expandAll = opt.accoridonExpAll,
            $aceMenu = $(this),
            $menuStyle = $(this).attr('data-menu-style');
        //Initilizing        
        $aceMenu.find('ul').addClass("sub-menu");
        $aceMenu.find('ul').siblings('a').append('<span class="arrow"></span>');
        if ($menuStyle == 'accordion') {$(this).addClass('collapse');
        }
        //Window resize on menu breakpoint 
        if($(window).innerWidth()<= $resizeWidth){
        menuCollapse();
        }
        // Menu Toggle
        function menuCollapse(){
            var w = $(window).innerWidth();
            
                $aceMenu.attr('data-menu-style', $menuStyle);
                $aceMenu.removeClass('collapse hide-menu').removeAttr('style');
                $('.menu-toggle').hide();
                if ($aceMenu.attr('data-menu-style') == 'accordion'){
                    $aceMenu.addClass('collapse');
                    return;
                }
                $aceMenu.find('li.menu-active').removeClass('menu-active');
                $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
           
        }
        // Main function 
        return this.each(function (){

            // Function for Horizontal menu on mouseenter
            $aceMenu.on('mouseover', '> li a', function (){
                if ($aceMenu.hasClass('collapse') === true){
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).parent('li').siblings().children('.sub-menu').stop(true, true).removeClass('slide').removeAttr('style').stop();
                $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                return;
            });
            $aceMenu.on('mouseleave', 'li', function () {
                if ($aceMenu.hasClass('collapse') === true) {
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).removeClass('menu-active');
                $(this).children('ul.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style');
                return;
            });
            //End of Horizontal menu function
           
        });
        //End of Main function
    }
})(jQuery);