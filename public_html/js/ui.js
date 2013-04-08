
/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: iu.coffee
 * Description: Methods for building the UI.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/


(function() {
  var $, LoadDialogue, TopMenu,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  window.PropelUI || (window.PropelUI = {
    TopMenu: TopMenu = (function(_super) {

      __extends(TopMenu, _super);

      function TopMenu() {
        var item, items, makeMenuButton, menus;
        items = {
          add: {
            icon: "plus",
            id: "add-menu",
            text: " Add ",
            dropdown: [$("<a>").text("Table").on("click", function() {})]
          },
          save: {
            icon: "download",
            id: "save-menu",
            text: " Save ",
            dropdown: [$("<a>").text("File").on("click", function() {}), $("<a>").text("XML").on("click", function() {})]
          },
          load: {
            icon: "upload",
            id: "load-menu",
            text: " Load ",
            dropdown: [
              $("<a>").text("File").on("click", function() {
                return LoadDialogue.getDialogue().file().show();
              }), $("<a>").text("XML").on("click", function() {
                return LoadDialogue.getDialogue().xml().show();
              })
            ]
          }
        };
        $.extend(this, $("<form>"));
        menus = [];
        makeMenuButton = function(item) {
          var $button, $dropdown, $link;
          $dropdown = new Bootstrap.Components.Dropdown(item.dropdown).attr("id", item.id);
          $link = $("<a>").append("<i class='icon-" + item.icon + " icon-white'></i>", item.text, "<span class='caret'>");
          $button = new Bootstrap.Base.Button($link, true);
          return Bootstrap.Components.ButtonGroup.decorate(new Bootstrap.Javascript.Dropdown($dropdown, $button.deEmphasize()));
        };
        for (item in items) {
          menus.push(makeMenuButton(items[item]));
        }
        this.append(menus);
      }

      return TopMenu;

    })(jQuery),
    Dialogues: {
      LoadDialogue: LoadDialogue = (function() {
        var LoadDialogueSingleton, dialogueID, inputID, loadButtonID;

        function LoadDialogue() {}

        dialogueID = "loadModal";

        inputID = "xml-input";

        loadButtonID = "load-xml";

        LoadDialogueSingleton = (function(_super) {
          var checkFile, loadXML, setType;

          __extends(LoadDialogueSingleton, _super);

          function LoadDialogueSingleton() {
            var $body, $footer, $loadButton, heading;
            heading = "Load an XML schema";
            $body = $("<form>");
            $body.append($("<fieldset>").append(function() {
              var $controlGroup, $label;
              $label = $("<label>", {
                "for": inputID
              });
              $label.text("XML schema to load");
              $controlGroup = new Bootstrap.Base.Form.ControlGroup();
              return $controlGroup.setLabel($label).setControls();
            }));
            $loadButton = new Bootstrap.Base.Button("Load").primary().on("click", function() {
              return $body.trigger("submit");
            }).attr("id", loadButtonID);
            $footer = Bootstrap.Javascript.Modal.makeDismissButton("Cancel").add($loadButton);
            $.extend(this, LoadDialogueSingleton.__super__.constructor.call(this, heading, $body, $footer));
            this.show = function() {
              return LoadDialogueSingleton.prototype.show.call(this);
            };
            this.attr("id", dialogueID);
          }

          checkFile = function(file) {
            var $controlGroup, $loadButton, filesizeWarn, mimeRegex;
            mimeRegex = /^text.*$/;
            filesizeWarn = 102400;
            $loadButton = this.children("div.modal-footer").children("#" + loadButtonID);
            $controlGroup = Bootstrap.Base.Form.ControlGroup.decorate(this.children("div.modal-body").find("div.control-group"));
            if (!file) {
              $loadButton.disable();
            } else if (!file.type.match(mimeRegex)) {
              $controlGroup.error("This file must be a text file");
              $loadButton.disable();
            } else if (file.size > filesizeWarn) {
              $controlGroup.warning("This file is very large. Are you sure that it is the correct file?");
              $loadButton.disable(false);
            } else {
              $controlGroup.validationState();
              $loadButton.disable(false);
            }
            return this;
          };

          LoadDialogueSingleton.decorate = function($item, $with) {
            if ($with == null) {
              $with = new LoadDialogueSingleton();
            }
            if (!($item instanceof jQuery)) {
              $item = $($item);
            }
            $.extend($with, $item);
            $with.show = function() {
              return LoadDialogueSingleton.prototype.show.call(this);
            };
            return $with.attr("id", dialogueID);
          };

          LoadDialogueSingleton.prototype.file = function() {
            this.reset();
            return setType.call(this, "file");
          };

          loadXML = function(xml) {
            var build, reader,
              _this = this;
            build = function(xml) {
              var $alert, $canvas, database, message, _ref;
              try {
                database = Builder.buildFromXML(xml);
                $canvas = $("svg.propelCanvas");
                $canvas.propelCanvas("destroy");
                $canvas.propelCanvas("init", [{}, database]);
                return this.modal("hide");
              } catch (ex) {
                message = ((_ref = ex.message) != null ? _ref.match(/^Invalid XML/i) : void 0) ? "Invalid XML" : ex.message != null ? ex.message : ex;
                $alert = this.children("div.modal-body").find(".alert").first();
                if ($alert.length === 0) {
                  $alert = new Bootstrap.Components.Alert();
                } else {
                  $alert = Bootstrap.Components.Alert.decorate($alert);
                }
                this.children("div.modal-body").prepend($alert);
                return $alert.error("<strong>Error.</strong> " + message);
              }
            };
            if (window.File && window.FileReader && xml instanceof File) {
              reader = new FileReader();
              reader.onloadend = function() {
                return build.call(_this, reader.result);
              };
              return reader.readAsText(xml);
            } else {
              return build.call(this, xml);
            }
          };

          setType = function(type) {
            var $form, $input, $loadButton, $newInput, _ref, _ref1,
              _this = this;
            $input = this.children("div.modal-body").find("#" + inputID);
            $loadButton = this.children("div.modal-footer").children("button#" + loadButtonID);
            $form = this.children("div.modal-body").children("form");
            switch (type) {
              case "file":
                if ($input.length === 0 || (typeof $input.get === "function" ? (_ref = $input.get(0).nodeName) != null ? _ref.toLowerCase() : void 0 : void 0) === "textarea") {
                  $newInput = $("<input>", {
                    type: "file"
                  });
                  $newInput.on("change", function() {
                    return checkFile.call(_this, $newInput.prop("files")[0]);
                  });
                  $loadButton.disable();
                  $form.off("submit").on("submit", function() {
                    return loadXML.call(_this, $newInput.prop("files")[0]);
                  });
                }
                break;
              case "xml":
                if ($input.length === 0 || (typeof $input.get === "function" ? (_ref1 = $input.get(0).nodeName) != null ? _ref1.toLowerCase() : void 0 : void 0) === "input") {
                  $newInput = $("<textarea>", {
                    rows: 6,
                    placeholder: "Type or paste the XML schema here."
                  });
                  $loadButton.disable(false);
                  $form.off("submit").on("submit", function() {
                    return loadXML.call(_this, $newInput.val());
                  });
                }
            }
            if ($newInput != null) {
              if ($input.length !== 0) {
                $input.replaceWith($newInput);
              } else {
                this.children("div.modal-body").find("div.controls").prepend($newInput);
              }
              $input = $newInput.attr("id", inputID);
              $input.addClass("input-block-level");
            }
            return this;
          };

          LoadDialogueSingleton.prototype.reset = function() {
            var $controlGroup, $input, $loadButton, $modalBody;
            $modalBody = this.children("div.modal-body");
            $modalBody.find(".alert").remove();
            $input = $modalBody.find("#" + inputID);
            $loadButton = this.children("div.modal-footer").children("button#" + loadButtonID);
            $controlGroup = Bootstrap.Base.Form.ControlGroup.decorate($modalBody.find(".control-group"));
            if ($input.length !== 0) {
              $input.wrap("<form>").parent("form").get(0).reset();
              $input.unwrap();
            }
            return $controlGroup.validationState();
          };

          LoadDialogueSingleton.prototype.show = function() {
            var $modal;
            $modal = $("#" + dialogueID);
            if ($modal.length === 0) {
              this.appendTo($("body"));
            }
            return this.modal("show");
          };

          LoadDialogueSingleton.prototype.xml = function() {
            this.reset();
            return setType.call(this, "xml");
          };

          return LoadDialogueSingleton;

        })(Bootstrap.Javascript.Modal);

        LoadDialogue.getDialogue = function() {
          var $modal;
          $modal = $("#" + dialogueID);
          if ($modal.length === 0) {
            return new LoadDialogueSingleton();
          } else {
            return LoadDialogueSingleton.decorate($modal.first());
          }
        };

        return LoadDialogue;

      }).call(this)
    }
  });

}).call(this);
