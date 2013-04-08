function testControlGroup() {
    var $controls = $("<p>Hi there!</p>"),
        $label = $("<label>A label</label>"),
        $controlGroup = new Bootstrap.Base.Form.ControlGroup($controls, $label);

    assertTrue("Container div should be of the control-group class", $controlGroup.hasClass("control-group"));
    assertTrue("Control div should be of the controls class", $controlGroup.children("div").hasClass("controls"));
    assertEquals("Control div should contain the given controls", "<p>Hi there!</p>", $controlGroup.children("div.controls").html());
    assertEquals("Container should contain the given html before the controls div", 1, $controlGroup.children("label").length);
    assertTrue("Label should be of the control-label class", $controlGroup.children("label").hasClass("control-label"));
}