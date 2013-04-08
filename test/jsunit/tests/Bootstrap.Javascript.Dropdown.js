function testEmptyDropdown() {
    var $dropdown = new Bootstrap.Javascript.Dropdown();
    assertTrue("Container should be a jQuery instance", $dropdown instanceof jQuery);
    assertEquals("Container should be a div element", "div", $dropdown.get(0).nodeName.toLowerCase());
    assertTrue("Container should be of the dropdown class", $dropdown.hasClass("dropdown"));
}

function testAddDropdown() {
    var $dropdown = new Bootstrap.Javascript.Dropdown();
    $dropdown.setDropdown(new Bootstrap.Components.Dropdown("An item"));
    assertEquals("Dropdown should contain the added dropdown component", 1, $dropdown.children("ul.dropdown-menu").length);
}

function testAddTrigger() {
    var $dropdown = new Bootstrap.Javascript.Dropdown(),
        $trigger;
    $dropdown.setTrigger($("<a>The trigger</a>"));
    $trigger = $dropdown.children("a");
    assertEquals("Dropdown should contain the trigger element", "The trigger", $trigger.text());
    assertTrue("Trigger should be of the dropdown-toggle class", $trigger.hasClass("dropdown-toggle"));
    assertEquals("Trigger should have the data attribute 'toggle' set to 'dropdown'", "dropdown", $trigger.attr("data-toggle"));
}