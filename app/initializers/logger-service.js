export function initialize(container, application) {
  application.inject('route', 'loggerService', 'service:logger');
  application.inject('controller', 'loggerService', 'service:logger');
}

export default {
  name: 'logger-service',
  initialize: initialize
};
