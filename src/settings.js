define({
  // A positive number lowers the top of the viewport,
  // while a negative number raises the top of the viewport
  topPadding: 0,
  // A positive number raises the bottom of the viewport,
  // while a negative number lowers the bottom of the viewport
  bottomPadding: 0,
  // Enforced timeout between checks on an element
  checkTimeout: 100,
  // Enforced delay between calls to the scroll handler
  onScrollThrottle: 10,
  // Enforced debounced delay on calls to the resize handler
  onResizeDebounce: 100,
  // Event namespace used to preserve control over jQuery events
  eventNamespace: '.viewport',
  // Initialise when bindings are added
  initialiseOnBinding: true,
  // Denotes that initialisation has completed
  hasInitialised: false,
  // Denotes that event listeners have been bound
  hasBoundEvents: false
});