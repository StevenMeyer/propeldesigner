function testMakeEmptyDropdown() {
    var $ul = window.PropelDesigner.UI.Bootstrap.Dropdown.makeDropdown();
    assertTrue("Returned item should be a jQuery object", $ul instanceof jQuery);
    assertEquals("List should have a menu role", "menu", $ul.attr("role"));
    assertTrue("List should have the dropdown-menu class", $ul.hasClass("dropdown-menu"));
    assertEquals("List should have no items", 0, $ul.children().length);
}

function testMakeDropdownWithOneTextItem() {
    var $ul = window.PropelDesigner.UI.Bootstrap.Dropdown.makeDropdown(["item"]);
    assertEquals("List should contain one item", 1, $ul.children("li").length);
    assertTrue("List item should contain an anchor link", $ul.children("li").length === $ul.find("li > a").length);
    assertEquals("List item should contain the item's text", "item", $ul.find("li > a").text());
}

function testMakeDropdownWithOnejQueryItem() {
    var $ul = window.PropelDesigner.UI.Bootstrap.Dropdown.makeDropdown([$("<span>Item<\span>")]);
    assertEquals("List should contain one item", 1, $ul.children("li").length);
    assertTrue("List item should contain an anchor link", $ul.children("li").length === $ul.find("li > a").length);
    assertEquals("List item should contain the item", "Item", $ul.find("li > a > span").text());
}

function testMakeDropdownWithTwoTextItems() {
    var $ul = window.PropelDesigner.UI.Bootstrap.Dropdown.makeDropdown(["item1","item2"]);
    assertEquals("List should contain two items", 2, $ul.children("li").length);
    assertTrue("List item should contain an anchor link", $ul.children("li").length === $ul.find("li > a").length);
    assertTrue("List items should contain the item's text", "item1" === $ul.find("li:first > a").text() && "item2" === $ul.find("li:last > a").text());
}

function testMakeDropdownWithTwojQueryItems() {
    var $ul = window.PropelDesigner.UI.Bootstrap.Dropdown.makeDropdown([$("<span>item1</span>"),$("<span>item2</span>")]);
    assertEquals("List should contain two items", 2, $ul.children("li").length);
    assertTrue("List item should contain an anchor link", $ul.children("li").length === $ul.find("li > a").length);
    assertTrue("List items should contain the item's text", "item1" === $ul.find("li:first > a > span").text() && "item2" === $ul.find("li:last > a > span").text());
}