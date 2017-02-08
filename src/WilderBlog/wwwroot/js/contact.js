﻿// contact.js
(function (Vue, VeeValidate) {

  Vue.use(VeeValidate);

  var app = new Vue({
    el: "#contact-form",
    data: {
      mail: {
        name: "",
        email: "",
        subject: "Pick One...",
        msg: ""
      },
      subjects: [
        "Pick One...",
        "Training",
        "Course Question",
        "Business Proposition",
        "Other"
      ],
      errorMessage: "",
      statusMessage: ""
    },
    computed: {
      isPristine: function () {
        var val = (this.mail.name == "" || this.mail.email == "" || this.mail.msg == "" || this.mail.subject == this.subjects[0]);
        return val;
      }
    },
    methods: {
      onSubmit: function () {

        var me = this;

        me.statusMessage = ""
        
        // Validate All returns a promise and provides the validation result.
        this.$validator.validateAll().then(function (success) {
          if (!success) {
            me.errorMessage = "Please fix one or more validation errors...";
            return;
          }
          me.statusMessage = "Sending...";
          me.$http.post("/contact", this.mail)
            .then(function () {
              me.statusMessage = "Message Sent...";
              me.name = "";
              me.email = "";
              me.subject = this.subjects[0];
              me.msg = "";
            }, function () {
              me.statusMessage = "";
              me.errorMessage = "Failed to send message!"
            });
        });
      }
    },
    created: function () {
      this.$set(this, 'errors', this.$validator.errorBag)
    }
  });

})(Vue, VeeValidate);