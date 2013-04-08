function testMakeEmptyModal() { //probably not desired behaviour, but still...
    var $modal = new Bootstrap.Javascript.Modal(),
        $children = $modal.children("div"),
        $header = $children.eq(0),
        $body = $children.eq(1),
        $footer = $children.eq(2);
    assertTrue("Modal container should be a jQuery object", $modal instanceof jQuery);
    assertTrue("Container should be of the modal class", $modal.hasClass("modal"));
    assertTrue("Container should have ARIA attributes", $modal.attr("role") === "dialog" && $modal.attr("aria-hidden") === "true");
    assertEquals("Container should contain 3 section divs", 3, $modal.children("div").length);
    assertTrue("Header should be of the modal-header class", $header.hasClass("modal-header"));
    assertEquals("Header should contain a close button", "x", $header.children("button[data-dismiss='modal']").text());
    assertTrue("Close button should be of the close class", $header.children("button[data-dismiss='modal']").hasClass("close"));
    assertTrue("Body should be of the modal-body class", $body.hasClass("modal-body"));
    assertTrue("Footer should be of the modal-footer class", $footer.hasClass("modal-footer"));
}

function testMakeModalHeader() {
    var $modal = new Bootstrap.Javascript.Modal("Modal header"),
        $header = $modal.children("div.modal-header");

    assertEquals("Header should contain two elements", 2, $header.children().length);
    assertEquals("Heading h3 element should be present", "Modal header", $header.children("h3").text());
}

function testMakeModalHeaderWithjQueryObject() {
    var $modal = new Bootstrap.Javascript.Modal($("<p>").text("Modal jQuery header")),
        $header = $modal.children("div.modal-header");

    assertEquals("Header should contain two elements", 2, $header.children().length);
    assertEquals("jQuery object should be present", "Modal jQuery header", $header.children("h3").children("p").text());
}

function testMakeModalBody() {
    var $modal = new Bootstrap.Javascript.Modal("Modal Header", $("<p>My body</p>"));
    
    assertEquals("Body should contain the given contents", "<p>My body</p>", $modal.children("div.modal-body").html());
}

function testMakeModalBodyWithoutjQuery() {
    var $modal1 = new Bootstrap.Javascript.Modal("Modal Header", "<p>My body</p>"),
        pojso = document.createElement("p"),
        $modal2 = new Bootstrap.Javascript.Modal("Modal Header", pojso);

    assertEquals("Body should contain the given contents", "<p>My body</p>", $modal1.children("div.modal-body").html());
    assertEquals("Body should contain the given contents", "<p></p>", $modal2.children("div.modal-body").html());
}

function testMakeModalFooter() {
    var $modal = new Bootstrap.Javascript.Modal("Modal Header", "<p>My body</p>", $("<button class='btn' data-dismiss='modal'>"));
    
    assertEquals("Footer should contain the given contents", "<button class=\"btn\" data-dismiss=\"modal\"></button>", $modal.children("div.modal-footer").html());
}

function testMakeModalFooterWithoutjQuery() {
    var $modal1 = new Bootstrap.Javascript.Modal("Modal Header", "<p>My body</p>", "<button class='btn' data-dismiss='modal'>"),
        pojso = document.createElement("button"),
        $modal2 = new Bootstrap.Javascript.Modal("Modal Header", "<p>My body</p>", pojso);

    assertEquals("Footer should contain the given contents", "<button class=\"btn\" data-dismiss=\"modal\"></button>", $modal1.children("div.modal-footer").html());
    assertEquals("Footer should contain the given contents", "<button></button>", $modal2.children("div.modal-footer").html());
}

function testMakeCloseButton() {
    var $button1 = Bootstrap.Javascript.Modal.makeDismissButton(),
        $button2 = Bootstrap.Javascript.Modal.makeDismissButton("Cancel");
    
    assertEquals("Button should have dismiss data", "modal", $button1.attr("data-dismiss"));
    assertEquals("Button text should be the specified text", "Cancel", $button2.text());
}