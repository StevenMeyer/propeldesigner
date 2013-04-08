
/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: bootstrap.coffee
 * Description: Scriptable Twitter Bootstrap widgets and component creation.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/


(function() {
  var $, Alert, Button, ButtonGroup, ControlGroup, Dropdown, Modal,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = jQuery;

  $.fn.extend({
    disable: function(disable) {
      if (disable == null) {
        disable = true;
      }
      return this.each(function() {
        var $this, nodeName, _ref;
        $this = $(this);
        nodeName = typeof $this.get === "function" ? (_ref = $this.get(0).nodeName) != null ? _ref.toLowerCase() : void 0 : void 0;
        if (disable) {
          $this.addClass("disabled");
          if (nodeName === "button" || nodeName === "input") {
            return $this.attr("disabled", "disabled");
          }
        } else {
          $this.removeClass("disabled");
          return $this.removeAttr("disabled");
        }
      });
    }
  });

  window.Bootstrap || (window.Bootstrap = {
    Base: {
      Button: Button = (function(_super) {

        __extends(Button, _super);

        function Button(text, deemphasize) {
          var $button, _ref;
          if (text == null) {
            text = "";
          }
          if (deemphasize == null) {
            deemphasize = false;
          }
          if ((typeof text.get === "function" ? (_ref = text.get(0).nodeName) != null ? typeof _ref.toLowerCase === "function" ? _ref.toLowerCase() : void 0 : void 0 : void 0) === "a") {
            $button = text;
          } else {
            $button = $("<button>", {
              type: "button"
            });
            $button.text(text);
          }
          Button.decorate($button, this);
        }

        Button.decorate = function($item, $with) {
          if ($with == null) {
            $with = new Button();
          }
          if (!($item instanceof Object)) {
            $item = $($item);
          }
          $.extend($with, $item);
          return $with.addClass("btn");
        };

        Button.prototype.blockLevel = function() {
          return this.addClass("btn btn-block");
        };

        Button.prototype.danger = function() {
          return this.defaultStyle().addClass("btn-danger");
        };

        Button.prototype.deEmphasize = function(deEmphasize) {
          if (deEmphasize == null) {
            deEmphasize = true;
          }
          this.addClass("btn");
          if (deEmphasize) {
            return this.addClass("btn-link");
          } else {
            return this.removeClass("btn-link");
          }
        };

        Button.prototype.defaultSize = function() {
          return this.addClass("btn").removeClass("btn-large btn-small btn-mini");
        };

        Button.prototype.defaultStyle = function() {
          return this.addClass("btn").removeClass("btn-primary btn-info btn-success btn-warning btn-danger btn-inverse btn-link");
        };

        Button.prototype.info = function() {
          return this.defaultStyle().addClass("btn-info");
        };

        Button.prototype.inverse = function() {
          return this.defaultStyle().addClass("btn-inverse");
        };

        Button.prototype.large = function() {
          return this.defaultSize().addClass("btn-large");
        };

        Button.prototype.link = function() {
          return this.defaultStyle().addClass("btn-link");
        };

        Button.prototype.mini = function() {
          return this.defaultSize().addClass("btn-mini");
        };

        Button.prototype.primary = function() {
          return this.defaultStyle().addClass("btn-primary");
        };

        Button.prototype.small = function() {
          return this.defaultSize().addClass("btn-small");
        };

        Button.prototype.success = function() {
          return this.defaultStyle().addClass("btn-success");
        };

        Button.prototype.warning = function() {
          return this.defaultStyle().addClass("btn-warning");
        };

        return Button;

      })(jQuery),
      Form: {
        ControlGroup: ControlGroup = (function(_super) {
          var a, setValidationMessage;

          __extends(ControlGroup, _super);

          function ControlGroup($controls, $label) {
            ControlGroup.decorate($("<div>"), this);
            this.setControls($controls);
            if ($label != null) {
              this.setLabel($label);
            }
          }

          a = function(state, message) {
            this.validationState(state);
            setValidationMessage.call(this, message);
            return this;
          };

          ControlGroup.decorate = function($item, $with) {
            if ($with == null) {
              $with = new ControlGroup();
            }
            if (!($item instanceof Object)) {
              $item = $($item);
            }
            $.extend($with, $item);
            $with.error = function(message) {
              return ControlGroup.prototype.error.call(this, message);
            };
            return $with.addClass("control-group");
          };

          ControlGroup.prototype.error = function(message) {
            return a.call(this, "error", message);
          };

          ControlGroup.prototype.info = function(message) {
            return a.call(this, "info", message);
          };

          ControlGroup.prototype.success = function(message) {
            return a.call(this, "success", message);
          };

          ControlGroup.prototype.warning = function(message) {
            return a.call(this, "warning", message);
          };

          ControlGroup.prototype.setControls = function($controls) {
            var $oldControls;
            if ($controls == null) {
              $controls = [];
            }
            $oldControls = this.children(".controls");
            if ($oldControls.length === 0) {
              this.append($("<div>").addClass("controls").append($controls));
            } else {
              $oldControls.empty().append($controls);
            }
            return this;
          };

          ControlGroup.prototype.setHelptext = function(message, display) {
            var $controls, $message;
            if (display == null) {
              display = "inline";
            }
            $controls = this.children(".controls");
            if ($controls.length === 0) {
              $controls = this.setControls().children("div.controls");
            }
            $message = $controls.children("span.help-inline,span.help-block");
            if ($message.length === 0) {
              display = display === "block" ? "block" : "inline";
              $controls.append($("<span>").addClass("help-" + display).append(message));
            } else {
              $message.first().empty().append(message);
            }
            return this;
          };

          ControlGroup.prototype.setLabel = function($label) {
            var $oldLabel, _ref;
            if ($label == null) {
              $label = "";
            }
            if (typeof $label === "string") {
              $label = $("<label>").html($label);
            }
            if (!($label instanceof jQuery)) {
              $label = $($label);
            }
            if ((typeof $label.get === "function" ? (_ref = $label.get(0).nodeName) != null ? typeof _ref.toLowerCase === "function" ? _ref.toLowerCase() : void 0 : void 0 : void 0) !== "label") {
              $label = $("<label>").append($label);
            }
            $label.addClass("control-label");
            $oldLabel = this.children(".control-label");
            if ($oldLabel.length === 0) {
              this.prepend($label);
            } else {
              $oldLabel.replaceWith($label);
            }
            return this;
          };

          setValidationMessage = function(message) {
            var $helptext, $validationMessage;
            if (message == null) {
              message = "";
            }
            $helptext = this.children(".controls").children("span.help-inline,span.help-block").first();
            if ($helptext.length === 0) {
              return $helptext = this.setHelptext($("<span class='validation-message'>").append(message)).children(".controls").children("span.help-inline").first();
            } else {
              $validationMessage = $helptext.find(".validation-message").first();
              if ($validationMessage.length === 0) {
                $validationMessage = $("<span class='validation-message'>").appendTo($helptext);
              }
              $validationMessage.empty().append(message);
              return this;
            }
          };

          ControlGroup.prototype.validationState = function(state) {
            var states;
            states = ["error", "info", "success", "warning"];
            this.removeClass(states.join(" "));
            if (__indexOf.call(states, state) >= 0) {
              return this.addClass(state);
            } else {
              setValidationMessage.call(this);
              return this;
            }
          };

          return ControlGroup;

        })(jQuery)
      }
    },
    Components: {
      Alert: Alert = (function(_super) {

        __extends(Alert, _super);

        function Alert(text) {
          var $button;
          Alert.decorate($("<div>"), this);
          $button = $("<button>", {
            type: "button",
            "data-dismiss": "alert"
          });
          $button.addClass("close");
          $button.text("x");
          this.append($button);
        }

        Alert.prototype.alertBlock = function(alertBlock) {
          if (alertBlock == null) {
            alertBlock = true;
          }
          this.addClass("alert");
          if (alertBlock) {
            return $this.addClass("alert-block");
          } else {
            return $this.removeClass("alert-block");
          }
        };

        Alert.prototype.setContext = function(context, message) {
          var contexts;
          if (context == null) {
            context = "warning";
          }
          contexts = ["error", "info", "success", "warning"];
          this.removeClass("alert-" + (contexts.join(" alert-")));
          if (__indexOf.call(contexts, context) < 0) {
            context = "warning";
          }
          this.addClass("alert alert-" + context);
          if (message != null) {
            this.html(message);
          }
          return this;
        };

        Alert.prototype.danger = function(message) {
          return this.setContext("error", message);
        };

        Alert.decorate = function($item, $with) {
          if ($with == null) {
            $with = new Alert();
          }
          if (!($item instanceof Object)) {
            $item = $($item);
          }
          $.extend($with, $item);
          $with.error = function(message) {
            return Alert.prototype.error.call(this, message);
          };
          $with.html = function(html) {
            return Alert.prototype.html.call(this, html);
          };
          $with.prepend = function() {
            return Alert.prototype.prepend.apply(this, arguments);
          };
          $with.remove = function() {
            return Alert.prototype.remove.call(this);
          };
          $with.text = function(text) {
            return Alert.prototype.text.call(this, text);
          };
          $with.addClass("fade in");
          return Alert.prototype.setContext.call($with, "warning");
        };

        Alert.prototype.error = function(message) {
          return this.danger(message);
        };

        Alert.prototype.html = function(html) {
          var $button;
          $button = this.children(".close").first();
          $button.detach();
          if (typeof html === "function") {
            html = html.call(this, 0, this.get(0));
          }
          return this.empty().append($button, $($.parseHTML(html)));
        };

        Alert.prototype.info = function(message) {
          return this.setContext("info", message);
        };

        Alert.prototype.prepend = function() {
          var $button, $siblings, arg, item;
          item = [];
          if (arguments.length > 1) {
            for (arg in arguments) {
              item.push(arguments[arg]);
            }
          } else if (typeof arguments[0] === "function") {
            item = aguments[0].call(this, 0, this.get(0));
          } else {
            item = arguments[0];
          }
          $button = this.children(".close").first();
          $siblings = this.detach(".close:first").contents();
          return this.empty().append($button, item, $siblings);
        };

        Alert.prototype.remove = function() {
          if (typeof this.alert === "function") {
            return this.alert("close");
          } else {
            return this.remove();
          }
        };

        Alert.prototype.success = function(message) {
          return this.setContext("success", message);
        };

        Alert.prototype.text = function(text) {
          var $button;
          $button = this.children(".close").first();
          $button.detach();
          if (typeof text === "function") {
            text = text.call(this, 0, this.text());
          }
          return this.empty().append($button, document.createTextNode(text));
        };

        Alert.prototype.warning = function(message) {
          return this.setContext("warning", message);
        };

        return Alert;

      })(jQuery),
      ButtonGroup: ButtonGroup = (function(_super) {

        __extends(ButtonGroup, _super);

        function ButtonGroup(buttons) {
          ButtonGroup.decorate($("<div>"), this);
          if (buttons != null) {
            this.append(buttons);
          }
        }

        ButtonGroup.prototype.append = function(buttons) {
          var $button, item, nodeName, _ref, _results;
          if (buttons == null) {
            buttons = [];
          }
          if (typeof buttons === "function") {
            buttons = buttons.call(this, 0, this.get(0));
          }
          if (typeof buttons !== "object") {
            buttons = [buttons];
          }
          _results = [];
          for (item in buttons) {
            $button = buttons[item];
            if (typeof $button !== jQuery) {
              $button = $($button);
            }
            nodeName = typeof $button.get === "function" ? (_ref = $button.get(0).nodeName) != null ? _ref.toLowerCase() : void 0 : void 0;
            if (nodeName === "button" || (nodeName === "input" && (typeof $button.attr === "function" ? $button.attr("type") : void 0) === "button") || (typeof $button.hasClass === "function" ? $button.hasClass("btn") : void 0)) {
              _results.push($.fn.append.call(this, $button));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };

        ButtonGroup.decorate = function($item, $with) {
          if ($with == null) {
            $with = new ButtonGroup();
          }
          if (!($item instanceof Object)) {
            $item = $($item);
          }
          $.extend($with, $item);
          $with.append = function(buttons) {
            return ButtonGroup.prototype.append.call(this, buttons);
          };
          return $with.addClass("btn-group");
        };

        ButtonGroup.prototype.horizontal = function() {
          return this.addClass("btn-group").removeClass("btn-group-vertical");
        };

        ButtonGroup.prototype.vertical = function() {
          return this.addClass("btn-group btn-group-vertical");
        };

        return ButtonGroup;

      })(jQuery),
      Dropdown: Dropdown = (function(_super) {

        __extends(Dropdown, _super);

        function Dropdown(items) {
          Dropdown.decorate($("<ul>", {
            role: "menu"
          }), this);
          this.append(items);
        }

        Dropdown.prototype.append = function(items) {
          var $append, appendThis, item,
            _this = this;
          if (items == null) {
            items = [];
          }
          if (typeof items === "function") {
            items = items.call(this, 0, this.get(0));
          }
          $append = $.fn.append;
          appendThis = function(item) {
            var $item, nodeName;
            $item = null;
            if (typeof item === "string") {
              item = $("<a>", {
                tabindex: -1,
                href: "#"
              }).html(item);
            }
            $item = item instanceof jQuery ? item : $(item);
            nodeName = typeof $item.get === "function" ? $item.get(0).nodeName.toLowerCase() : void 0;
            if (nodeName !== "li") {
              if (nodeName === "a") {
                if ($item.attr("tabindex") !== -1) {
                  $item.attr("tabindex", -1);
                }
                if (!($item.attr("href") != null)) {
                  $item.attr("href", "#");
                }
              } else {
                $item = $("<a>", {
                  tabindex: -1,
                  href: "#"
                }).append($item);
              }
              $item = $("<li>").append($item);
            }
            return $append.call(_this, $item);
          };
          if (typeof items === "string") {
            appendThis(items);
          } else if (items instanceof jQuery) {
            items.each(function() {
              return appendThis(this);
            });
          } else {
            for (item in items) {
              appendThis(items[item]);
            }
          }
          return this;
        };

        Dropdown.decorate = function($item, $with) {
          if ($with == null) {
            $with = new DropDown();
          }
          if (!($item instanceof Object)) {
            $item = $($item);
          }
          $.extend($with, $item);
          $with.append = function(items) {
            return Dropdown.prototype.append.call(this, items);
          };
          return $with.addClass("dropdown-menu");
        };

        Dropdown.prototype.pullLeft = function() {
          return this.pullRight(false);
        };

        Dropdown.prototype.pullRight = function(pullRight) {
          if (pullRight == null) {
            pullRight = true;
          }
          if (pullRight) {
            return this.addClass("pull-right");
          } else {
            return this.removeClass("pull-right");
          }
        };

        return Dropdown;

      })(jQuery)
    },
    Javascript: {
      Dropdown: Dropdown = (function(_super) {
        var setARIAlabel;

        __extends(Dropdown, _super);

        function Dropdown($dropdown, $trigger) {
          Dropdown.decorate($("<div>"), this);
          this.setDropdown($dropdown);
          this.setTrigger($trigger);
        }

        Dropdown.decorate = function($item, $with) {
          if ($with == null) {
            $with = new DropDown();
          }
          if (!($item instanceof Object)) {
            $item = $($item);
          }
          $.extend($with, $item);
          return $with.addClass("dropdown");
        };

        setARIAlabel = function() {
          var $dropdown, $trigger, labelledby;
          $trigger = this.children(".dropdown-toggle");
          $dropdown = this.children(".dropdown-menu");
          labelledby = "";
          $trigger.each(function() {
            if ($trigger.attr("id") != null) {
              labelledby = $trigger.attr("id");
              return false;
            }
          });
          if (labelledby) {
            $dropdown.attr("aria-labelledby", labelledby);
          } else {
            $dropdown.removeAttr("aria-labelledby");
          }
          return this;
        };

        Dropdown.prototype.setDropdown = function($dropdown) {
          var $oldDropdown;
          if ($dropdown == null) {
            $dropdown = "";
          }
          if (!($dropdown instanceof jQuery)) {
            $dropdown = $($dropdown);
          }
          if ($dropdown.length !== 0) {
            $dropdown.addClass("dropdown-menu");
            $oldDropdown = this.children(".dropdown-menu");
            if ($oldDropdown.length !== 0) {
              $oldDropdown.replaceWith($dropdown);
            } else {
              this.append($dropdown);
            }
          }
          return setARIAlabel.call(this);
        };

        Dropdown.prototype.setTrigger = function($trigger, replaceExisting) {
          if ($trigger == null) {
            $trigger = "";
          }
          if (replaceExisting == null) {
            replaceExisting = true;
          }
          if (!($trigger instanceof jQuery)) {
            $trigger = $($trigger);
          }
          if ($trigger.length !== 0) {
            $trigger.addClass("dropdown-toggle");
            $trigger.attr("data-toggle", "dropdown");
            if (replaceExisting) {
              this.children(".dropdown-toggle").remove();
            }
            this.prepend($trigger);
          }
          return setARIAlabel.call(this);
        };

        return Dropdown;

      })(jQuery),
      Modal: Modal = (function(_super) {
        var setSection;

        __extends(Modal, _super);

        function Modal(heading, body, footer) {
          Modal.decorate($("<div>"), this);
          this.setHeader(heading);
          this.setBody(body);
          this.setFooter(footer);
        }

        Modal.decorate = function($item, $with) {
          if ($with == null) {
            $with = new Modal();
          }
          if (!($item instanceof Object)) {
            $item = $($item);
          }
          $.extend($with, $item);
          $with.addClass("modal hide fade");
          return $with.attr({
            tabindex: -1,
            role: "dialog",
            "aria-hidden": true
          });
        };

        Modal.makeDismissButton = function(text) {
          var $button;
          if (text == null) {
            text = "Close";
          }
          $button = new Bootstrap.Base.Button(text);
          return $button.attr({
            "data-dismiss": "modal",
            "aria-hidden": true
          });
        };

        setSection = function(section, content) {
          var $section;
          $section = this.children(".modal-" + section);
          if ($section.length === 0) {
            $section = $("<div>");
            $section.addClass("modal-" + section);
            this.append($section.append(content));
          } else {
            $section.empty().append(content);
          }
          return $section;
        };

        Modal.prototype.setBody = function(body) {
          return setSection.call(this, "body", body);
        };

        Modal.prototype.setFooter = function(footer) {
          return setSection.call(this, "footer", footer);
        };

        Modal.prototype.setHeader = function(header) {
          var $close, $header, $heading;
          $header = setSection.call(this, "header", null);
          $close = $header.children("button.close[data-dismiss='modal']");
          $heading = $header.children(":not(button.close[data-dismiss='modal'])").first();
          if ($close.length === 0) {
            $close = $("<button>", {
              type: "button",
              "data-dismiss": "modal",
              "aria-hidden": true
            });
            $close.addClass("close");
            $close.text("x");
            $header.append($close);
          }
          if ($heading.length === 0) {
            $heading = $("<h3>");
            $header.append($heading);
          }
          if (typeof header === "string") {
            $heading.html(header);
          } else {
            $heading.empty().append(header);
          }
          return this;
        };

        return Modal;

      })(jQuery)
    }
  });

}).call(this);
