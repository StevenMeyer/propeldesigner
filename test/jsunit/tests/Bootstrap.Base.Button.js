function testMakeStandardButton() {
    var $button = new Bootstrap.Base.Button("foo");
    assertTrue("Button should be a jQuery object", $button instanceof jQuery);
    assertEquals("Button should be a button element", "button", $button.get(0).nodeName.toLowerCase());
    assertTrue("Button should have the btn class", $button.hasClass("btn"));
    assertEquals("Button should contain the given text", "foo", $button.text());
}

function testMakeLinkButton() {
    var $button = new Bootstrap.Base.Button($("<a>"));
    assertTrue("Button should be a jQuery object", $button instanceof jQuery);
    assertEquals("Button should be an anchor element", "a", $button.get(0).nodeName.toLowerCase());
    assertTrue("Button should have the btn class", $button.hasClass("btn"));
    
    $button = new Bootstrap.Base.Button($("<a>")).deEmphasize();
    assertTrue("De-emphasized button should have the btn and btn-link classes", $button.hasClass("btn") && $button.hasClass("btn-link"));
}