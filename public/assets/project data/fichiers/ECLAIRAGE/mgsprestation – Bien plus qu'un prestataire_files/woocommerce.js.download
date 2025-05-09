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
            $this.listGridView();
            $this.cartDropdown();
            $this.AddtoCartQuanty();
            $this.AutoCompleteSearch(); 
            $this.belowfooter();
          },
        listGridView: function (){
            var wrapper = $('.thunk-list-grid-switcher');
            var class_name = '';
            wrapper.find('a').on('click', function (e){
              e.preventDefault();
                var type = $(this).attr('data-type');
                switch (type){
                    case "list":
                        class_name = "thunk-list-view";
                        break;
                    case "grid":
                        class_name = "thunk-grid-view";
                        break;
                    default:
                        class_name = "thunk-grid-view";
                        break;
                }
                if (class_name != ''){
                    $(this).closest('#shop-product-wrap').attr('class', '').addClass(class_name);
                    $(this).closest('.thunk-list-grid-switcher').find('a').removeClass('selected');
                    $(this).addClass('selected');
                }
              
            });
        },
        
       cartDropdown: function (){
           /* woo, wc_add_to_cart_params */
              if ( typeof wc_add_to_cart_params === 'undefined' ){
               return false;
              }
              $( document ).on( 'click', '.ajax_add_to_cart', function(e){ // Remove button selector
                 e.preventDefault();
                var data1 = {
                 'action': 'top_store_product_count_update'
                };
                 $.post(
                 woocommerce_params.ajax_url, // The AJAX URL
                 data1, // Send our PHP function
                 function(response_data){
                 $('a.cart-content').html(response_data);
                 }
               );
             });
          // Ajax remove cart item
               $( document ).on( 'click', 'a.remove', function(e){ // Remove button selector
               e.preventDefault();
          // AJAX add to cart request
              var $thisbutton = $( this );
              if ( $thisbutton.is( '.remove' ) ){
                //Check if the button has a product ID
               if ( ! $thisbutton.attr( 'data-product_id' ) ){ 
              return true;
               }
            }
              $product_id = $thisbutton.attr( 'data-product_id' );
              var data = {'product_id':$product_id,
             'action': 'top_store_product_remove'
            };
            $.post(
            woocommerce_params.ajax_url, // The AJAX URL
            data, // Send our PHP function
            function(response){
            $('.top-store-quickcart-dropdown').html(response);
            var data = {
           'action': 'top_store_product_count_update'
            };
           $.post(
           woocommerce_params.ajax_url, // The AJAX URL
           data, // Send our PHP function
           function(response_data){
           $('.cart-content').html(response_data);
           }
         );
       }
   );
      return false;
  });
},  
       AddtoCartQuanty: function (){
                $('form.cart').on( 'click', 'button.plus, button.minus', function(){
                // Get current quantity values
                var qty = $( this ).siblings('.quantity').find( '.qty' );
                var val = parseFloat(qty.val()) ? parseFloat(qty.val()) : '0';
                var max = parseFloat(qty.attr( 'max' ));
                var min = parseFloat(qty.attr( 'min' ));
                var step = parseFloat(qty.attr( 'step' ));
                // Change the value if plus or minus
                if ( $(this).is( '.plus' ) ) {
                    if ( max && ( max <= val ) ) {
                        qty.val( max );
                    } else {
                        qty.val( val + step );
                    }
                } else {
                    if ( min && ( min >= val ) ) {
                        qty.val( min );
                    } else if ( val > 1 ) {
                        qty.val( val - step );
                    }
                }
                 
            });

        },
        belowfooter:function(){
            jQuery("footer .below-footer,footer .below-footer-bar,.below-footer-col1,footer .container,.footer-copyright").attr('style', 'display: block !important');
            jQuery(".footer-copyright a,.footer-copyright span").attr('style', 'display: inline-block !important');
            jQuery(".below-footer-bar").attr('style', 'display: flex !important');
        },
        
AutoCompleteSearch: function () {
      $(document).on(
        "click",
        ".thmk-woocommerce-search-wrap .thmk-woocommerce-search-wrap-submit button",
        autoCompleteSubmit
      );
      function autoCompleteSubmit() {
        let button_ = $(this);
        let getUrl = button_.attr("data-url");
        let mainWrap = button_.closest(".thmk-woocommerce-search-wrap");
        let text_ = mainWrap.find('input[name="product-search-text"]').val();
        let category = mainWrap.find('select[name="product_cat"]').val();
        let title_ = text_ && text_ !== "" ? text_ : "";
        let cate_ = category && category !== "" ? category : "";
        // console.log("getUrl -> ", getUrl);
        if (getUrl) {
          let urlText =
            getUrl + `?s=${title_}&product_cat=${cate_}&post_type=product`;
          window.location.href = urlText;
        }
      }
      // by click in input-----------------------------------------
      $(document).on(
        "click",
        '.thmk-woocommerce-search-wrap input[name="product-search-text"]',
        function () {
          const searchBoxTxt = $(this);
          const mainWrap = searchBoxTxt.closest(
            ".thmk-woocommerce-search-wrap"
          );
          const resultWrap = mainWrap.find(".thmk-woocommerce-search-result");
          const getLiresult = resultWrap.find("li");
          let searchVal = searchBoxTxt.val();
          if (
            !mainWrap.hasClass("loading") &&
            searchVal &&
            searchVal.length >= 2 &&
            getLiresult.length > 0
          ) {
            resultWrap.show();
          } else {
            resultWrap.hide();
          }
        }
      );
      var searchTimeout = null;
      //   by input keyup----------------------------------------------
      $(document).on(
        "keyup",
        '.thmk-woocommerce-search-wrap input[name="product-search-text"]',
        autoComplete
      );
      function autoComplete(e) {
        // console.log("event typr", e.type);
        const searchBoxTxt = $(this);
        const mainWrap = searchBoxTxt.closest(".thmk-woocommerce-search-wrap");
        const resultWrap = mainWrap.find(".thmk-woocommerce-search-result");
        const resultWrapUl = resultWrap.find("ul");
        const submitButton = mainWrap.find(
          ".thmk-woocommerce-search-wrap-submit button"
        );
        let searchVal = searchBoxTxt.val();
        if (searchVal && searchVal.length >= 2) {
          mainWrap.addClass("loading");
          //   hide click outside
          jQuery(document).mouseup(function (e) {
            if (!mainWrap.is(e.target) && mainWrap.has(e.target).length === 0) {
              resultWrap.hide();
            }
          });
          //   hide click outside
          let select_ = mainWrap.find(".thmk-woocommerce-select");
          let cat_ = select_.length && select_.val() ? select_.val() : "";
          let dataToAjx = {
            action: "top_store_search_site",
            match: searchVal,
            cat: cat_,
          };
          //   return;
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            $.ajax({
              type: "POST",
              dataType: "json",
              url: topstore.ajaxUrl,
              data: dataToAjx,
              success: function (response) {
                // console.log("response -> ", response);
                resultWrap.show();
                if (response.data.length > 0) {
                  let productLists = "";
                  let viewMoreLink = "";
                  let dataList = response.data;
                  let getUrl = submitButton.attr("data-url");
                  if (dataList.length > 5) {
                    // fruits.slice(0, 5)
                    dataList = dataList.slice(0, 5);
                    let urlText =
                      getUrl +
                      `?s=${searchVal}&product_cat=${cat_}&post_type=product`;
                    viewMoreLink +=
                      '<li class="view-all-search"><a href="' + urlText + '">';
                    viewMoreLink += "View all results";
                    viewMoreLink += "</a></li>";
                  }
                  $.each(dataList, (index_, val_) => {
                    productLists += '<li><a href="' + val_.link + '">';
                    productLists +=
                      '<div class="srch-prd-img"><img src="' +
                      val_.imglink +
                      '"></div>';
                    productLists += '<div class="srch-prd-content">'; //content
                    productLists +=
                      '<span class="title">' + val_.label + "</span>";
                    productLists += '<span class="price">'; //price
                    productLists += val_.price;
                    productLists += "</span>"; //price
                    productLists += "</div>"; //content
                    productLists += "</a></li>";
                  });
                  productLists += viewMoreLink;
                  resultWrapUl.html(productLists);
                  mainWrap.removeClass("loading");
                } else {
                  let htmlBlank = '<li class="no-result">No Result Found</li>';
                  resultWrapUl.html(htmlBlank);
                  mainWrap.removeClass("loading");
                }
              },
            });
          }, 50);
        } else {
          resultWrap.hide();
        }
      }
    },

      }
    TopStoreWooLib.init();
})(jQuery);