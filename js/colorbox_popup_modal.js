(function ($) {

  /**
   * This function get data for create modal colorbox popup
   * @param data
   */
  $.fn.colorbox_popup_init_modal = function (data) {

    var title = (typeof data.title) ? data.title : '';
    var content = (typeof data.content) ? data.content : '';

    content = $('<div id="colorbox-popup-cnt"></div>').html(content);

    var autoresize = false;
    var modal = {
      onComplete:Drupal.colorbox_popup_oncomplete,
      onOpen:function () {
        $('#cboxLoadingOverlay,#cboxLoadingGraphic').css('display', 'none');
        $('#cboxContent').css('visibility', 'hidden');
      }
    };

    if (!data.width && !data.height) {
      autoresize = true;
      modal.scrolling = false;
    }

    if (data.onComplete) {
      data.onComplete = eval(data.onComplete);
    }

    if (data.onClosed) {
      data.onClosed = eval(data.onClosed);
    }

    $('#cboxLoadingOverlay,#cboxLoadingGraphic').css('display', 'none');
    $('#cboxContent').css('visibility', 'hidden');
    $.extend(modal, data);
    $.colorbox(modal);
  };

  Drupal.colorbox_popup_expand = function () {
    $('#colorbox,#cboxLoadedContent,#cboxContent,#cboxWrapper,#cboxMiddleLeft,#cboxMiddleRight').css('height', '100%');
  };

  Drupal.colorbox_popup_oncomplete = function () {
    var childobj = $('#cboxLoadedContent').children();
    childobj.prepend('<div id="cbox-into-title">' + $('#cboxTitle').html() + '</div>');

    // placeholder
    $('input[type="text"], ' + 'textarea').each(function () {
      if ($(this).attr('placeholder') != undefined && $(this).attr('placeholder').length) {
        var placeholder = $(this).attr('placeholder');
        $(this).bind('focus', function () {
          $(this).attr('placeholder', '');
        });
        $(this).bind('blur', function () {
          $(this).attr('placeholder', placeholder);
        });
      }
    });

    $('#cboxContent').css('visibility', 'visible');

    Drupal.attachBehaviors($('#cboxLoadedContent'), Drupal.settings);
  };

  /**
   * Resize colorbox
   * @param data
   */
  $.fn.colorbox_popup_resize = function (data) {
    data = data || {};
    if (!data.height) {
      $.colorbox.resize();
    }

    if (data.width) {
      $.colorbox.resize(data);
    }
  };
})(jQuery);
