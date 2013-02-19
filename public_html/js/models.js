/* 
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: models.js
 * Description: ER models.
 */

var PropelDesigner = {};

PropelDesigner.Column = function() {
    
};

PropelDesigner.ColumnList = function() {
    var columns = [];
    
    this.addColumn = function(column) {
        if (1 > arguments.length && column instanceof PropelDesigner.Column) {
            return false;
        }
        columns[columns.length] = column;
    };
    
    this.getColumns = function() {
        return columns;
    };
    
    this.size = function() {
        return columns.length;
    };
};