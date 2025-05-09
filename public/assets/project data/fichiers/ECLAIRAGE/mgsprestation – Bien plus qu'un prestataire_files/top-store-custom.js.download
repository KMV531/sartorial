/**************/
// TopStoreLib
/**************/
(function ($) {
    var TopStoreLib = {
        init: function (){
            this.bindEvents();
        },
        bindEvents: function (){
              
             var $this = this;
             $this.sticky_header();
             $this.sticky_sidebar_hide_toggle();
             $this.sticky_sidebar_secondary_hide_toggle();
             $this.sideabr_toggle();
             $this.sticky_product_search();
             $this.pre_loader();
             $this.CatMenu();
             $this.DefaultMenu();
             $this.MainMenu();
             $this.StickMenu();
             $this.AboveMenu();
             $this.AboveMenuM();
             $this.MobileMenuFunction();
             // $this.Top2Slider();
                if(top_store.top_store_move_to_top_optn){
                  $this.MoveToTop();
                }
             if($('.header__cat__item.dropdown').length!==0){
             $this.cat_toggle();
             }
     
             $this.Searchbox();
        },
        sticky_sidebar_hide_toggle: function () {
               if($('#sidebar-primary.topstore-sticky-sidebar').length!==0){
                      var lastScrollTop = 0;
                      $(window).on('scroll', function() {
                          st = $(this).scrollTop();
                          if(st < lastScrollTop) {

                             $('.product-cat-list').hide();

                          }
                          lastScrollTop = st;
                      });
            }
      },
      sticky_sidebar_secondary_hide_toggle: function () {
               if($('#sidebar-primary.topstore-sticky-sidebar').length!==0){
                      var lastScrollTop = 0;
                      $(window).on('scroll', function() {
                          st = $(this).scrollTop();
                          lastScrollTop = st;
                      });
            }
      },
        sideabr_toggle: function () {
                    $(document).ready(function() {
                          if ($(window).width() <= 990) { 
                          $('.sidebar-content-area .widget-title').click(function() {
                          $(this).next().slideToggle();
                          $(this).toggleClass("open");
                          });
                         
                          }     
                });
                         
        },
        sticky_header: function () {
                    if(top_store.top_store_sticky_header_effect=='scrldwmn'){
                    var position = jQuery(window).scrollTop(); 
                    var $headerBar = jQuery('header').height();
                    // should start at 0
                    jQuery(window).scroll(function() {
                        var scroll = jQuery(window).scrollTop();
                        if(scroll > position || scroll < $headerBar) {
                        jQuery(".sticky-header").removeClass("stick");
                        $(".search-wrapper").removeClass("open");
                        }else{
                        jQuery(".sticky-header").addClass("stick");
                        }
                        position = scroll;
                    });
                  }else{
                      jQuery(document).on("scroll", function(){
                      var $headerBar = jQuery('header').height();
                        if(jQuery(document).scrollTop() > $headerBar){
                            jQuery(".sticky-header").addClass("stick");
                          }else{
                            $(".search-wrapper").removeClass("open");
                            jQuery(".sticky-header").removeClass("stick");
                        } 
                       });
                  }
        },
        sticky_product_search: function () {
 
                  $('.prd-search').on('click', function (e) {
                     e.preventDefault();
                    $(".search-wrapper").addClass("open");
                  });
                  $('.search-close-btn').on('click', function (e) {
                     e.preventDefault();
                    $(".search-wrapper").removeClass("open");
                  });   
            
        },
       
          cat_toggle : function () {
                    $('.header__cat__item.dropdown').on('click', function (e) {
                    e.preventDefault();
                    $(this).toggleClass('open');
                    });

          },
          pre_loader : function () {
                               if(!$('body').hasClass('elementor-editor-active')){
                                $(window).on('load', function(){
                                setTimeout(removeLoader); //wait for page load PLUS two seconds.
                                });
                                function removeLoader(){
                                    $( ".top_store_overlayloader" ).fadeOut(700, function(){
                                      // fadeOut complete. Remove the loading div
                                   $(".top-store-pre-loader img" ).hide(); //makes page more lightweight
                                    });  
                                  }
                                }

          },
        
          CatMenu : function () {
                 // category toggle
                $(".cat-toggle").click(function(){
                              $(".product-cat-list").slideToggle();
                              $(".toggle-icon", this).toggleClass("icon-circle-arrow-down");
                             });
                //category toggle on keypress
                $(".cat-toggle").keypress(function(){
                              $(".product-cat-list").slideToggle();
                              $(".toggle-icon", this).toggleClass("icon-circle-arrow-down");
                             });
                             $(".product-cat-list").ThunkCatMenu({
                                 resizeWidth:'', // Set the same in Media query       
                                 animationSpeed:'fast', //slow, medium, fast
                                 accoridonExpAll:true//Expands all the accordion menu on click
                             });

                             if ($(window).width() <= 1024) {
                              $(".children.sub-menu").closest("li").find("> a").on("click",function(e){
                                e.preventDefault();
                              });  
                             } 
        },
        DefaultMenu: function(){
                 $("#menu-all-pages.top-store-menu").topStoreResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
             });
        },
        MainMenu : function(){
                $("#top-store-menu").topStoreResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
            });
        },
        StickMenu : function(){
                $("#top-store-stick-menu").topStoreResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
            });
        },
        AboveMenu : function(){
                $("#top-store-above-menu").topStoreResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
             });     
        
        },
        AboveMenuM : function(){
                $(".main-header #top-store-above-menu").topStoreResponsiveMenu({
                 resizeWidth:'1024', // Set the same in Media query       
                 animationSpeed:'medium', //slow, medium, fast
                 accoridonExpAll:true//Expands all the accordion menu on click
             });     
        
        },
       
        MobileMenuFunction : function(){
            
                 // close-button-active
                       $(window).on("load resize",function(e){
                           if($(window).width()<='1024'){
                              $('body').find('.sider').prepend('<div class="menu-close"><span tabindex="0" class="menu-close-btn"></span></div>');
                              $('.menu-close-btn').removeAttr("href");
                              //Menu close
                              $('.menu-close-btn,.top-store-menu li a span.top-store-menu-link').click(function(){
                              $('body').removeClass('mobile-menu-active');
                              $('body').removeClass('sticky-mobile-menu-active');
                              });
                              $('.menu-close-btn,.top-store-menu li a span.top-store-menu-link').keypress(function(){
                              $('body').removeClass('mobile-menu-active');
                              $('body').removeClass('sticky-mobile-menu-active');
                              });
                                ///////////////////////////////////////////////////// Keyboard Navigation
                                  $(".menu-close-btn").on("click", function(){ 
                                    // focus and select
                                   $('.menu-toggle .menu-btn').focus().select();
                                   // $('.royal-shop-menu a,.menu-close,.arrow').attr('tabindex',-1);
                                });
                                $(".menu-close-btn").on("keypress", function(){   
                                   
                                    // focus and select
                                   $('.menu-toggle .menu-btn').focus().select();
                                   // $('.royal-shop-menu a,.menu-close,.arrow').attr('tabindex',-1);
                                });
                                //////////////////////////////////////////////////
                             }
                         });
                    /* -----------------------------------------------------------------------------------------------
                      Modal Menu
                    --------------------------------------------------------------------------------------------------- */
                        this.keepFocusInModal();
                        // Esc key close menu
                        document.addEventListener( 'keydown', function( event ) {
                        if ( event.keyCode === 27 ) {
                          event.preventDefault();
                          document.querySelectorAll( '.mobile-menu-active' ).forEach( function( element ) {
                            jQuery('body').removeClass('mobile-menu-active');
                          }.bind( this ) );
                          document.querySelectorAll( '.mobile-above-menu-active' ).forEach( function( element ) {
                            jQuery('body').removeClass('mobile-above-menu-active');
                          }.bind( this ) );
                        }
                      }.bind( this ) );
                    //ToggleBtn above Click
                    $('#menu-btn-abv').click(function (e){
                       e.preventDefault();
                       $('body').addClass('mobile-above-menu-active');
                       $('#top-store-above-menu').removeClass('hide-menu'); 
                       $('.sider.above').removeClass('top-store-menu-hide');
                       $('.sider.main').addClass('top-store-menu-hide');
                    });
                    $('#menu-btn-abv').keypress(function (e){
                       e.preventDefault();
                       $('body').addClass('mobile-above-menu-active');
                       $('#top-store-above-menu').removeClass('hide-menu'); 
                       $('.sider.above').removeClass('top-store-menu-hide');
                       $('.sider.main').addClass('top-store-menu-hide');
                    });
                    //ToggleBtn main menu Click
                    $('#menu-btn,#mob-menu-btn').click(function (e){
                       e.preventDefault();
                       $('body').addClass('mobile-menu-active');
                       $('#top-store-menu').removeClass('hide-menu');
                       $('.sider.above').addClass('top-store-menu-hide');  
                       $('.sider.main').removeClass('top-store-menu-hide');    
                    });
                    $('#menu-btn,#mob-menu-btn').keypress(function (e){
                       e.preventDefault();
                       $('body').addClass('mobile-menu-active');
                       $('#top-store-menu').removeClass('hide-menu');
                       $('.sider.above').addClass('top-store-menu-hide');  
                       $('.sider.main').removeClass('top-store-menu-hide');    
                    });
                     
                    //sticky
                    $('#menu-btn-stk').click(function (e){
                       e.preventDefault();
                       $('body').addClass('sticky-mobile-menu-active');
                       $('.sider.main').addClass('top-store-menu-hide');
                      });
                    $('#menu-btn-stk').keypress(function (e){
                       e.preventDefault();
                       $('body').addClass('sticky-mobile-menu-active');
                       $('.sider.main').addClass('top-store-menu-hide');
                      });
                    // default page
                    $('#menu-btn,#mob-menu-btn').click(function (e){
                       e.preventDefault();
                       $('body').addClass('mobile-menu-active');
                       $('#menu-all-pages').removeClass('hide-menu');    
                    });
                    $('#menu-btn,#mob-menu-btn').keypress(function (e){
                       e.preventDefault();
                       $('body').addClass('mobile-menu-active');
                       $('#menu-all-pages').removeClass('hide-menu');    
                    });
            
                },
                      keepFocusInModal: function(){
                        var _doc = document;
                        _doc.addEventListener( 'keydown', function( event ) {
                          var toggleTarget, modal, selectors, elements, menuType, bottomMenu, activeEl, lastEl, firstEl, tabKey, shiftKey,
                            toggleTarget = '.sider';
                            if(jQuery('.mobile-menu-active').length!=''){
                            selectors = 'a';
                            modal = _doc.querySelector( toggleTarget );
                            elements = modal.querySelectorAll( selectors );
                            elements = Array.prototype.slice.call( elements );
                            if ( '.sider' === toggleTarget ) {
                              menuType = window.matchMedia( '(min-width: 1024px)' ).matches;
                              menuType = menuType ? '.expanded-menu' : '.top-store-menu';
                              elements = elements.filter( function( element ) {
                                return null !== element.closest( menuType ) && null !== element.offsetParent;
                              } );

                              elements.unshift( _doc.querySelector( '.menu-close-btn' ) );
                            }

                            lastEl = elements[ elements.length - 1 ];
                            firstEl = elements[0];
                            activeEl = _doc.activeElement;
                            tabKey = event.keyCode === 9;
                            shiftKey = event.shiftKey;

                            if ( ! shiftKey && tabKey && lastEl === activeEl ) {
                              event.preventDefault();
                              firstEl.focus();
                            }

                            if ( shiftKey && tabKey && firstEl === activeEl ) {
                              event.preventDefault();
                              lastEl.focus();
                            }
                          }
                        } );
                      },

            MoveToTop:function(){
                      /**************************************************/
                      // Show-hide Scroll to top & move-to-top arrow
                      /**************************************************/
                        jQuery("body").prepend("<a id='move-to-top' class='animate' href='#'><i class='fa fa-angle-up'></i></a>"); 
                        var scrollDes = 'html,body';  
                        /*Opera does a strange thing if we use 'html' and 'body' together so my solution is to do the UA sniffing thing*/
                        if(navigator.userAgent.match(/opera/i)){
                          scrollDes = 'html';
                        }
                        //show ,hide
                        jQuery(window).scroll(function (){
                          if(jQuery(this).scrollTop() > 160){
                            jQuery('#move-to-top').addClass('filling').removeClass('hiding');
                          }else{
                            jQuery('#move-to-top').removeClass('filling').addClass('hiding');
                          }
                        });
                        jQuery('#move-to-top').click(function(){
                            jQuery("html, body").animate({ scrollTop: 0 }, 600);
                            return false;
                        });
                     
                },
                

             
          Searchbox : function(){
          jQuery(".th-search").click(function(event){
          jQuery(".th-search-wrapper").slideDown();
          event.preventDefault();
         }); 
        
        jQuery(".th-search-close").click(function(){
          jQuery(".th-search-wrapper").slideUp();  
        }); 
        
        }, 
         
    }
  TopStoreLib.init();

})(jQuery);


