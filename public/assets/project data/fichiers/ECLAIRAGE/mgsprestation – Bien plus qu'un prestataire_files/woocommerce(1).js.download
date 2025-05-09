/********************************/
// TopStoreWooLib Custom Function
/********************************/
(function ($) {
    var TopStoreWooLib = {
        init: function (){
            this.bindEvents();
        },
        bindEvents: function (){
            var $this = this;
            $this.CategoryTabFilter();
            $this.ProductSlide();
            $this.ProductListSlide();
            $this.CategorySlider();  
            $this.BrandSlider();  
          },   
/***********************/        
// Front Page Function
/***********************/  
      CategoryTabFilter:function(){
                         //product slider 
                          if(topstore.top_store_single_row_slide_cat == true){
                          var sliderow = false;
                          }else{
                          var sliderow = true;
                          }
                    // slide autoplay
                            if(topstore.top_store_cat_slider_optn == true){
                            var cat_atply = true;
                            }else{
                            var cat_atply = false; 
                            } 
                            var owl = $('.thunk-product-cat-slide');
                                     owl.owlCarousel({
                                       items:3,
                                       nav: true,
                                       owl2row:sliderow, 
                                       owl2rowDirection: 'ltr',
                                       owl2rowTarget: 'thunk-woo-product-list',
                                       navText: ["<i class='slick-nav fa fa-angle-left'></i>",
                                       "<i class='slick-nav fa fa-angle-right'></i>"],
                                       loop:cat_atply,
                                       dots: false,
                                       smartSpeed: 1800,
                                       autoHeight: false,
                                       margin: 15,
                                       autoplay:cat_atply,
                                       responsive:{
                                       0:{
                                           items:2,
                                           margin:7.5,
                                       },
                                       768:{
                                           items:3,
                                       },
                                       900:{
                                           items:3,
                                       },
                                       1025:{
                                           items:4,
                                       }
                                   }
                                });
                          $('#thunk-cat-tab li a:first').addClass('active');
                          $(document).on('click', '#thunk-cat-tab li a', function(e){
                          $('#thunk-cat-tab .tab-content').append('<div class="thunk-loadContainer"> <div class="loader"></div></div>');
                          $(".thunk-product-tab-section .thunk-loadContainer").css("display", "block");
                          $('#thunk-cat-tab li a.active').removeClass("active");
                          $(this).addClass('active');
                                  var data_term_id = $( this ).attr( 'data-filter' );
                                  $.ajax({
                                      type: 'POST',
                                      url: topstore.ajaxUrl,
                                      data: {
                                        action :'top_store_cat_filter_ajax',
                                        'data_cat_slug':data_term_id,
                                       },
                                dataType: 'html'
                              }).done( function( response ){
                                if ( response ){
                                 $('#thunk-cat-tab .tab-content').html('<div class="thunk-slide thunk-product-cat-slide owl-carousel"></div> <div class="thunk-loadContainer"> <div class="loader"></div></div>');
                                 $(".thunk-slide.thunk-product-cat-slide.owl-carousel").append(response);
                                 var owl = $('.thunk-product-cat-slide');
                                 owl.owlCarousel({
                                 items:4,
                                 nav: true,
                                 owl2row:sliderow, 
                                 owl2rowDirection: 'ltr',
                                 owl2rowTarget: 'thunk-woo-product-list',
                                 navText: ["<i class='slick-nav fa fa-angle-left'></i>",
                                 "<i class='slick-nav fa fa-angle-right'></i>"],
                                 loop:cat_atply,
                                 dots: false,
                                 smartSpeed: 1800,
                                 autoHeight: false,
                                 margin:15,
                                 autoplay:cat_atply,
                                 responsive:{
                                  0:{
                                           items:2,
                                           margin:7.5,
                                       },
                                       768:{
                                           items:3,
                                       },
                                       900:{
                                           items:3,
                                       },
                                       1025:{
                                           items:4,
                                       }
                             }
                               });
                            $(".thunk-product-tab-section .thunk-loadContainer").css("display", "none");

                              $(".thunk-product").hover(function() { 
                                $('.thunk-slide .owl-stage-outer').css("margin", "-6px -6px -100px"); 
                                $('.thunk-slide .owl-stage-outer').css("padding", "6px 6px 100px");
                                $('.thunk-slide .owl-nav').css("top", "-52px");
                              }, function() { 
                                $('.thunk-slide .owl-stage-outer').css("margin", "0"); 
                                $('.thunk-slide .owl-stage-outer').css("padding", "0"); 
                                $('.thunk-slide .owl-nav').css("top", "-58px");
                             }); 
                              
                              $('li.thvs_loop-available-attributes__value').hover(function () {
                               var src = $(this).attr('data-o-src');
                               var id = $(this).attr('data-product-id');
                            $('li.thvs_loop-available-attributes__value').closest('.post-'+ id ).find('img.attachment-woocommerce_thumbnail').attr("srcset", src );
                            });
             
                            } 
                          } );
                              e.preventDefault();
                           });

              },
      
      ProductSlide:function(){
                if(topstore.top_store_single_row_prdct_slide == true){
                var sliderow_p = false;
                }else{
                var sliderow_p = true;
                }
                // slide autoplay
                if(topstore.top_store_product_slider_optn == true){
                var cat_atply_p = true;
                }else{
                var cat_atply_p = false; 
                }
                var owl = $('.thunk-product-slide');
                     owl.owlCarousel({
                       items:3,
                       nav: true,
                       owl2row:sliderow_p, 
                       owl2rowDirection: 'ltr',
                       owl2rowTarget: 'thunk-woo-product-list',
                       navText: ["<i class='slick-nav fa fa-angle-left'></i>",
                       "<i class='slick-nav fa fa-angle-right'></i>"],
                       loop:cat_atply_p,
                       dots: false,
                       smartSpeed: 1800,
                       autoHeight: false,
                       margin:15,
                       autoplay:cat_atply_p,
                       responsive:{
                        0:{
                                           items:2,
                                           margin:7.5,
                                       },
                                       768:{
                                           items:3,
                                       },
                                       900:{
                                           items:3,
                                       },
                                       1025:{
                                           items:4,
                                       }
                   }
                });

      },
      ProductListSlide:function(){
                          if(topstore.top_store_single_row_prdct_list == true){
                            var sliderow_l = false;
                            }else{
                            var sliderow_l = true;
                            }
                            // slide autoplay
                            if(topstore.top_store_product_list_slide_optn == true){
                            var cat_atply_l = true;
                            }else{
                            var cat_atply_l = false; 
                            }
                            var owl = $('.thunk-product-list');
                                 owl.owlCarousel({
                                   items:3,
                                   nav: true,
                                   owl2row:sliderow_l, 
                                   owl2rowDirection: 'ltr',
                                   owl2rowTarget: 'thunk-woo-product-list',
                                   navText: ["<i class='slick-nav fa fa-angle-left'></i>",
                                   "<i class='slick-nav fa fa-angle-right'></i>"],
                                   loop:cat_atply_l,
                                   dots: false,
                                   smartSpeed: 1800,
                                   autoHeight: false,
                                   margin: 15,
                                   autoplay:cat_atply_l,
                                   responsive:{
                                   0:{
                                           items:2,
                                           margin:7.5,
                                       },
                                       768:{
                                           items:3,
                                       },
                                       900:{
                                           items:3,
                                       },
                                       1025:{
                                           items:4,
                                       }
                               }
                            });
                      
      },
       CategorySlider:function(){
                     // slide autoplay
                     if(topstore.top_store_category_slider_optn == true){
                      var cat_atply_c = true;
                      }else{
                      var cat_atply_c = false; 
                      }
                      var owl = $('.thunk-cat-slide');
                           owl.owlCarousel({
                             items:5,
                             nav: true,
                             navText: ["<i class='slick-nav fa fa-angle-left'></i>",
                             "<i class='slick-nav fa fa-angle-right'></i>"],
                             loop:cat_atply_c,
                             dots: false,
                             smartSpeed: 1800,
                             autoHeight: false,
                             margin:15,
                             autoplay:cat_atply_c,
                             responsive:{
                             0:{
                                           items:3,
                                           margin:7.5,
                                       },
                                       768:{
                                           items:4,
                                       },
                                       900:{
                                           items:4,
                                       },
                                       1025:{
                                           items:5,
                                       },
                                       1200:{
                                           items:5,
                                       }
                         }
              });

       }, 
       BrandSlider:function(){
                       // slide autoplay
                      if(topstore.top_store_brand_slider_optn == true){
                      var brd_atply = true;
                      }else{
                      var brd_atply = false; 
                      }
                      var owl = $('.thunk-brand');
                           owl.owlCarousel({
                             items:5,
                             nav: true,
                             navText: ["<i class='brand-nav fa fa-angle-left'></i>",
                             "<i class='brand-nav fa fa-angle-right'></i>"],
                             loop:brd_atply,
                             dots: false,
                             smartSpeed: 1800,
                             autoHeight: false,
                             margin:15,
                             autoplay:brd_atply,
                             responsive:{
                             0:{
                                 items:3,
                                 margin:7.5,
                             },
                             600:{
                                 items:4,
                             },
                             1024:{
                                 items:4,
                             },
                             1025:{
                                 items:5,
                             }
                         }
                 });
                          
        },
      }
    TopStoreWooLib.init();
})(jQuery);