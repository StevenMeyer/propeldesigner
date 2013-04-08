function testMakeEmptyDropdown() {
    var $ul = new Bootstrap.Components.Dropdown();
    assertTrue("Returned item should be a jQuery object", $ul instanceof jQuery);
    assertEquals("List should have a menu role", "menu", $ul.attr("role"));
    assertTrue("List should have the dropdown-menu class", $ul.hasClass("dropdown-menu"));
    assertEquals("List should have no items", 0, $ul.children().length);
}

function testAppendString() {
    var $dropdown = new Bootstrap.Components.Dropdown(),
        $item;
    $dropdown.append("new item");
    assertEquals("List should have one item", 1, $dropdown.children().length);
    $item = $dropdown.children().first().children();
    assertEquals("List item should be an anchor element", "a", $item.get(0).nodeName.toLowerCase());
    assertTrue("List item should have the tabindex and href attributes set", $item.attr("tabindex") === "-1" && $item.attr("href") === "#");
    assertEquals("The string should be the content of the item", "new item", $item.html());
}

function testAppendjQueryObject() {
    var $dropdown = new Bootstrap.Components.Dropdown(),
        $item;
    $dropdown.append($("<p>New Item</p>"));
    assertEquals("List should have one item", 1, $dropdown.children().length);
    $item = $dropdown.children().first().children();
    assertEquals("List item should be an anchor element", "a", $item.get(0).nodeName.toLowerCase());
    assertTrue("List item should have the tabindex and href attributes set", $item.attr("tabindex") === "-1" && $item.attr("href") === "#");
    assertEquals("The string should be the content of the item", "<p>New Item</p>", $item.html());
}

function testAppendjQueryAnchorObject() {
    var $dropdown = new Bootstrap.Components.Dropdown(),
        $item;
    $dropdown.append($("<a id='foo'>New Item</a>"));
    assertEquals("List should have one item", 1, $dropdown.children().length);
    $item = $dropdown.children().first().children();
    assertEquals("List item should be an anchor element", "a", $item.get(0).nodeName.toLowerCase());
    assertTrue("List item should have the tabindex and href attributes set", $item.attr("tabindex") === "-1" && $item.attr("href") === "#");
    assertEquals("The string should be the content of the item", "New Item", $item.html());
    assertEquals("The anchor should be the specified anchor element", "foo", $item.attr("id"));
}

function testAppendjQueryListItemObject() {
    var $dropdown = new Bootstrap.Components.Dropdown(),
        $item;
    $dropdown.append($("<li id='foo'>My own item!</li>"));
    assertEquals("List should have one item", 1, $dropdown.children().length);
    $item = $dropdown.children().first();
    assertEquals("The list item should be the specified list item element", "foo", $item.attr("id"));
    assertEquals("The string should be the content of the item", "My own item!", $item.html());
}