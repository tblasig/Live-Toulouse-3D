import template from './content.template.html';
import controller from './content.controller';
import './content.styles.scss';

let contentComponent = {
    template,
    controller :['$http', controller],
    replace: true
};

export default contentComponent;
