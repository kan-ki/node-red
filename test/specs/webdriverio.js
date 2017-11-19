var should = require("should");

describe('webdriver.io page', function() {
    before(function() {
        browser.url('http://localhost:1880/');
        browser.waitForExist('#palette_node_inject', 10000);
    });

    after(function() {
    });

    it('should have a right title', function () {
        var title = browser.getTitle();
        title.should.equal('Node-RED');
    });

    it('should have an input label', function() {
        var inputLabel = browser.getText('#palette-header-input');
        inputLabel.should.equal('input');
    });

    it('should be able to drag and drop', function() {
        browser.waitForExist('#palette_node_inject', 10000);
        // console.log(browser.getText('.nodegroup:nth-of-type(2)'));
        // console.log(browser.element('#palette-header-input'));

        // var nodeSelector = '//*[@id="7b410f79.7dea5"]';
        // browser.waitForExist(nodeSelector, 50000);

        /*
        // browser.leftClick(nodeSelector);
        browser.moveToObject(nodeSelector, 10, 10);
        browser.buttonDown();
        browser.moveToObject(nodeSelector, 200, 0);
        browser.buttonUp();
        */

        // browser.dragAndDrop('#palette_node_link_in', '.ui-droppable');
    });

    it('should work the simplest flow', function() {
        browser.moveToObject('#palette_node_inject', 10, 10);
        browser.buttonDown();
        // page object may have to add random number for adjusting a node position.
        browser.moveToObject('#palette_node_inject', 300, 50);
        browser.buttonUp();

        browser.moveToObject('#palette_node_debug', 10, 10);
        browser.buttonDown();
        browser.moveToObject('#palette_node_debug', 300, -50);
        browser.buttonUp();

        browser.waitForExist('.port_output', 10000);
        browser.moveToObject('.port_output');
        browser.buttonDown();
        browser.moveToObject('.port_input');
        browser.buttonUp();

        browser.click('#btn-deploy');
        browser.pause(1000);

        browser.click('#red-ui-tab-debug');
        browser.click('.node_button_button');
        browser.waitForExist('.debug-message-type-number', 10000);
        var debugMessage = browser.getText('.debug-message-type-number');
        debugMessage.should.within(1500000000000, 3000000000000);
    });
/*
    it('should connect with a wire', function() {
        browser.moveToObject('.port_output');
        browser.buttonDown();
        browser.moveToObject('.port_input');
        browser.buttonUp();
        browser.pause(3000);
    });

    it('should open a node property dialog', function() {
        var nodeSelector = '//*[@id="7b410f79.7dea5"]';
        //// need left click before double click
        browser.leftClick(nodeSelector);
        browser.doubleClick(nodeSelector);
    });

    it('should deploy a node', function() {
        //// deploy an object by drag and drop
        browser.moveToObject('#palette_node_link_in', 10, 10);
        browser.buttonDown();
        browser.moveToObject('#palette_node_link_in', 200, 50);
        browser.buttonUp();
        // browser.pause(3000);
    });

    it('should have a right title', function () {
        var title = browser.getTitle();
        title.should.equal('Node-RED');
    });

    it('should have an input label', function() {
        var inputLabel = browser.getText('#palette-header-input');
        inputLabel.should.equal('入力');
    });

    it('should output a debug message', function() {
        browser.click('#red-ui-tab-debug');
        browser.click('.node_button_button');
        var debugMessage = browser.getText('.debug-message-type-number');
        debugMessage.should.within(1500000000000, 3000000000000);
    });
/*
    it('should show a menu', function() {
        browser.click('#btn-sidemenu');
        var viewMenu = browser.element('#menu-item-view-menu');
        should.exist(viewMenu);
    });
*/
});
