$().ready(function () {
  
  //Setup onclick handler for combiner
  $('#combine-btn').click(function () {
    //Clear any errors
    $('#combine-secrets-group').removeClass('has-error').removeClass('has-feedback');
    $('#combine-secrets-error-icon').addClass('sr-only');
    $('#combine-secrets-error').html('');
    
    var listing = $('#combine-secrets').val().trim().replace("\r", '');
    var shares = listing.split("\n");
    
    var secret = secrets.combine(shares);
    $('#combine-output').val(secrets.hex2str(secret));
  });
  
  //Setup onclick handler for splitter
  $('#split-btn').click(function () {
    //Clear any errors
    $('#split-threshold-group').removeClass('has-error').removeClass('has-feedback');
    $('#split-threshold-error-icon').addClass('sr-only');
    $('#split-threshold-error').html('');
    $('#split-total-group').removeClass('has-error').removeClass('has-feedback');
    $('#split-total-error-icon').addClass('sr-only');
    $('#split-total-error').html('');
    
    //Convert the secret to a hex key we can use
    var hex = secrets.str2hex($('#split-secret').val());
    
    //Get our configuration
    var threshold = parseInt($('#split-threshold').val(), 10);
    var total = parseInt($('#split-total').val(), 10);
    
    if (isNaN(threshold)) {
      $('#split-threshold-error').html('Threshold must be a number!');
      $('#split-threshold-group').addClass('has-error').addClass('has-feedback');
      $('#split-threshold-error-icon').removeClass('sr-only');
      return false;
    }
    
    if (threshold < 2) {
      $('#split-threshold-error').html('Threshold must be at least two!');
      $('#split-threshold-group').addClass('has-error').addClass('has-feedback');
      $('#split-threshold-error-icon').removeClass('sr-only');
      return false;
    }
    
    if (isNaN(total)) {
      $('#split-total-error').html('Total must be a number!');
      $('#split-total-group').addClass('has-error').addClass('has-feedback');
      $('#split-total-error-icon').removeClass('sr-only');
      return false;
    }
    
    if (total <= threshold) {
      $('#split-total-error').html('Total must be more than the threshold!');
      $('#split-total-group').addClass('has-error').addClass('has-feedback');
      $('#split-total-error-icon').removeClass('sr-only');
      return false;
    }
    
    //Split the key into shares
    var shares = secrets.share(hex, total, threshold);
    var output = shares.join("\n");
    
    //Output it
    $('#split-output').val(output);
  });
  
});