/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: main.coffee
 * Description: Preforms GUI functions outside of the canvas's scope.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

jQuery(document).ready(function($) {
  var addLoadDialogue, addPageButtons, checkFile, init, loadXML, openLoadDialogue;
  addLoadDialogue = function() {
    var $body, $container, $footer, $form, $header;
    $container = $("<div>", {
      id: "loadModal",
      tabindex: -1,
      role: "dialog",
      "aria-labelledby": "loadLabel",
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
        id: "loadLabel"
      });
      $h.text("Load an XML Schema");
      return [$close, $h];
    });
    $body = $("<div>");
    $body.addClass("modal-body");
    $form = $("<form>");
    $form.append(function() {
      var $fieldset;
      $fieldset = $("<fieldset>");
      $fieldset.append(function() {
        var $controlGroup;
        $controlGroup = $("<div>");
        $controlGroup.addClass("control-group");
        $controlGroup.append(function() {
          var $controls, $label;
          $label = $("<label>", {
            "for": "xml-input"
          });
          $label.addClass("control-label");
          $label.text("XML schema to load:");
          $controls = $("<div>");
          $controls.addClass("controls");
          return [$label, $controls];
        });
        return $controlGroup;
      });
      return $fieldset;
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
      $cancel.on("click", function() {
        return $body.children("div.alert").hide();
      });
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
          return openLoadDialogue("file");
        });
        $xml = $("<li>");
        $xml.append($("<a>", {
          tabindex: -1,
          href: "#",
          id: "load-xml"
        }).text("XML"));
        $xml.on("click", function() {
          return openLoadDialogue("xml");
        });
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
    $button = $("#loadModal > div.modal-footer > button:last");
    $controlGroup = $("#loadModal form div.control-group");
    $message = $controlGroup.find("span.help-inline");
    if (!file) {
      return $button.attr("disabled", "disabled");
    } else if (!file.type.match(mime)) {
      $controlGroup.removeClass("warning");
      $controlGroup.addClass("error");
      $message.text("The file is not a text file.");
      $message.show();
      return $button.attr("disabled", "disabled");
    } else if (file.size > fileSizeWarn) {
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
  loadXML = function(xml) {
    var $alert, $modal, build, message, reader;
    $modal = $("#loadModal");
    build = function(xml) {
      var $canvas, database;
      database = Builder.buildFromXML(xml);
      $canvas = $("svg.propelCanvas");
      $canvas.propelCanvas("destroy");
      return $canvas.propelCanvas("init", [{}, database]);
    };
    try {
      if (window.File && window.FileReader && xml instanceof File) {
        reader = new FileReader();
        reader.onloadend = function() {
          return build(reader.result);
        };
        reader.readAsText(xml);
      } else {
        build(xml);
      }
      return $modal.modal("hide");
    } catch (ex) {
      message = ex.message.match(/^Invalid XML/i) ? "Invalid XML" : ex.message;
      $alert = $modal.find("div.alert");
      if ($alert.length === 0) {
        $modal.children(".modal-body").prepend(function() {
          $alert = $("<div>");
          $alert.addClass("alert alert-error");
          return $alert.append(function() {
            var $button, $span;
            $button = $("<button>", {
              "data-dismiss": "alert",
              type: "button"
            });
            $button.addClass("close");
            $button.html("&times;");
            $span = $("<span>");
            return [$button, $span];
          });
        });
      }
      $alert.children("span").html("<strong>Error.</strong> " + ex.message);
      return $alert.show();
    }
  };
  openLoadDialogue = function(source) {
    var $button, $controls, $form, $modal;
    $modal = $("#loadModal");
    $button = $modal.find("div.modal-footer > button.btn-primary");
    if ($modal.length === 0) {
      $modal = addLoadDialogue();
    }
    $controls = $modal.find("div.controls");
    if (!$controls.hasClass(source)) {
      if (source === "file") {
        $controls.removeClass("xml");
      } else {
        source = "xml";
        $controls.removeClass("file");
      }
      $controls.empty();
      $controls.addClass(source);
      $controls.append(function() {
        var $input, $message;
        $input = source === "file" ? $("<input>", {
          type: "file"
        }) : $("<textarea>", {
          rows: 6
        });
        $input.attr("id", "xml-input");
        $input.addClass("input-block-level");
        if (source === "file") {
          $input.on("change", function(event) {
            return checkFile(event.currentTarget.files[0]);
          });
          $message = $("<span>");
          $message.addClass("help-inline");
          $message.hide();
          return [$input, $message];
        } else {
          return $input;
        }
      });
      $form = $controls.closest("form");
      if (source === "file") {
        $form.off("submit");
        $form.on("submit", function(event) {
          return loadXML(event.currentTarget[1].files[0]);
        });
        $button.attr("disabled", "disabled");
      } else {
        $form.off("submit");
        $form.on("submit", function(event) {
          return loadXML(event.currentTarget[1].value);
        });
        $button.removeAttr("disabled");
      }
    }
    return $modal.modal("show");
  };
  return init();
});
