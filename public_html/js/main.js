/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: main.coffee
 * Description: Preforms GUI functions outside of the canvas's scope.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

jQuery(document).ready(function($) {
  var addFileLoadDialogue, addPageButtons, checkFile, init, loadFile, loadXML, openFileLoadDialogue;
  addFileLoadDialogue = function() {
    var $body, $container, $footer, $form, $header;
    $container = $("<div>", {
      id: "loadFileModal",
      tabindex: -1,
      role: "dialog",
      "aria-labelledby": "modalLabel",
      "aria-hidden": true
    });
    $container.addClass("modal hide fade");
    $header = $("<div>");
    $header.addClass("modal-header");
    $header.append(function() {
      var $close, $h;
      $close = $("<button>", {
        type: "button",
        "data-dismiss": "modal",
        "aria-hidden": true
      });
      $close.addClass("close");
      $close.text("x");
      $h = $("<h3>", {
        id: "modalLabel"
      });
      $h.text("Load an XML Schema File");
      return [$close, $h];
    });
    $body = $("<div>");
    $body.addClass("modal-body");
    $form = $("<form>");
    $form.append(function() {
      var $fieldset;
      $fieldset = $("<fieldset>");
      $fieldset.append(function() {
        var $div;
        $div = $("<div>");
        $div.addClass("control-group");
        $div.append(function() {
          var $controls, $label;
          $label = $("<label>", {
            "for": "file-load-input"
          });
          $label.addClass("control-label");
          $label.text("Choose a schema to load.");
          $controls = $("<div>");
          $controls.addClass("controls");
          $controls.append(function() {
            var $file, $message;
            $file = $("<input>", {
              id: "file-load-input",
              type: "file"
            });
            $file.addClass("input-block-level");
            $file.on("change", function(event) {
              return checkFile(event.currentTarget.files[0]);
            });
            $message = $("<span>");
            $message.addClass("help-inline");
            $message.hide();
            return [$file, $message];
          });
          return [$label, $controls];
        });
        return $div;
      });
      return $fieldset;
    });
    $form.on("submit", function(event) {
      return loadFile(event.currentTarget[1].files[0]);
    });
    $body.append($form);
    $footer = $("<div>");
    $footer.addClass("modal-footer");
    $footer.append(function() {
      var $cancel, $load;
      $cancel = $("<button>", {
        "data-dismiss": "modal",
        "aria-hidden": true
      });
      $cancel.addClass("btn");
      $cancel.text("Cancel");
      $load = $("<button>", {
        disabled: "disabled"
      });
      $load.addClass("btn btn-primary");
      $load.text("Load");
      $load.on("click", function() {
        return $form.trigger("submit");
      });
      return [$cancel, $load];
    });
    $container.append($header, $body, $footer);
    $("body").append($container);
    return $container;
  };
  addPageButtons = function() {
    var $add, $caret, $form, $load, $nav, $save;
    $nav = $("div.nav-collapse");
    $caret = $("<span>");
    $caret.addClass("caret");
    $form = $("<form>");
    $form.addClass("navbar-form pull-right");
    $add = $("<div>");
    $add.addClass("btn-group");
    $add.append(function() {
      var $a, $ul;
      $a = $("<a>", {
        "data-toggle": "dropdown",
        href: "#"
      });
      $a.addClass("btn dropdown-toggle");
      $a.append(function() {
        var $icon, $text;
        $icon = $("<i>");
        $icon.addClass("icon-plus");
        $text = " Add ";
        return [$icon, $text, $caret.clone()];
      });
      $ul = $("<ul>", {
        id: "add"
      });
      $ul.addClass("dropdown-menu");
      $ul.append(function() {
        var $table;
        $table = $("<li>");
        $table.append($("<a>", {
          tabindex: -1,
          href: "#",
          id: "add-table"
        }).text("Table"));
        return [$table];
      });
      return [$a, $ul];
    });
    $save = $("<a>", {
      href: "#"
    });
    $save.addClass("btn disabled");
    $save.append(function() {
      var $icon, $text;
      $icon = $("<i>");
      $icon.addClass("icon-download");
      $text = " Save ";
      return [$icon, $text];
    });
    $load = $("<div>");
    $load.addClass("btn-group");
    $load.append(function() {
      var $a, $ul;
      $a = $("<a>", {
        "data-toggle": "dropdown",
        href: "#"
      });
      $a.addClass("btn dropdown-toggle");
      $a.append(function() {
        var $icon, $text;
        $icon = $("<i>");
        $icon.addClass("icon-upload");
        $text = " Load ";
        return [$icon, $text, $caret.clone()];
      });
      $ul = $("<ul>", {
        id: "load"
      });
      $ul.addClass("dropdown-menu");
      $ul.append(function() {
        var $file, $xml, append;
        $file = $("<li>");
        $file.append($("<a>", {
          tabindex: -1,
          href: "#",
          id: "load-file"
        }).text("File"));
        $file.on("click", function() {
          return openFileLoadDialogue();
        });
        $xml = $("<li>");
        $xml.append($("<a>", {
          tabindex: -1,
          href: "#",
          id: "load-xml"
        }).text("XML"));
        append = [$xml];
        if (window.File && window.FileReader) {
          append = [$file].concat(append);
        }
        return append;
      });
      return [$a, $ul];
    });
    $form.append($add, " ", $save, " ", $load);
    return $nav.append($form);
  };
  checkFile = function(file) {
    var $button, $controlGroup, $message, fileSizeWarn, mime;
    mime = /^text.*$/;
    fileSizeWarn = 1048576;
    $button = $("#loadFileModal > div.modal-footer > button:last");
    $controlGroup = $("#loadFileModal form div.control-group");
    $message = $controlGroup.find("span.help-inline");
    if (!file) {
      return $button.attr("disabled", "disabled");
    } else if (!file.type.match(/^text.*/)) {
      $controlGroup.removeClass("warning");
      $controlGroup.addClass("error");
      $message.text("The file is not a text file.");
      $message.show();
      return $button.attr("disabled", "disabled");
    } else if (file.size > fileSizeWarn) {
      console.log(fileSizeWarn);
      $controlGroup.removeClass("error");
      $controlGroup.addClass("warning");
      $message.text("The file is very large. Are you sure that it's the right one?");
      $message.show();
      return $button.removeAttr("disabled");
    } else {
      $controlGroup.removeClass("error warning");
      $message.hide();
      return $button.removeAttr("disabled");
    }
  };
  init = function() {
    return addPageButtons();
  };
  loadFile = function(file) {
    var reader;
    reader = new FileReader();
    reader.onloadend = function() {
      return loadXML(reader.result);
    };
    return reader.readAsText(file);
  };
  loadXML = function(xml) {
    var $canvas, database, table, _i, _len, _ref, _results;
    try {
      database = Builder.buildFromXML(xml);
    } catch (ex) {
      $.error(ex);
    }
    $canvas = $("svg#canvas");
    _ref = database.getTables();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      table = _ref[_i];
      _results.push($canvas.propelCanvas("addTable", table));
    }
    return _results;
  };
  openFileLoadDialogue = function() {
    var $modal;
    $modal = $("#loadFileModal");
    if ($modal.length === 0) {
      $modal = addFileLoadDialogue();
    }
    return $modal.modal("show");
  };
  return init();
});
