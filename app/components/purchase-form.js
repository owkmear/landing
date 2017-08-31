import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {

        let me = this;
        let usd = me.$('#usdInput');
        let btc = me.$('#btcInput');
        let sendButton = me.$('#sendButton');

        usd.on("blur", function() {
            verifyNumber(me.$(this), me.$(this).val());
        });
        
        usd.on("keypress", function() {
            verifyNumber(me.$(this), me.$(this).val());
        });
        
        usd.on("keyup", function() {
            verifyNumber(me.$(this), me.$(this).val());
            btc.val(
                (usd.val() / 3930.42)
                .toFixed(6)
            );

            if (regCheck(me.$(this).val()))
                sendButton.removeClass('disabled');
            else
                sendButton.addClass('disabled');
        });
        
        usd.on("change", function() {
            verifyNumber(me.$(this), me.$(this).val());
        });

        btc.on("blur", function() {
            verifyNumber(me.$(this), me.$(this).val());
        });
        
        btc.on("keypress", function() {
            verifyNumber(me.$(this), me.$(this).val());
        });
        
        btc.on("keyup", function() {
            verifyNumber(me.$(this), me.$(this).val());
            usd.val(
                (btc.val() * 3930.42)
                .toFixed(3)
            );

            if (regBtcCheck(me.$(this).val()))
                sendButton.removeClass('disabled');
            else
                sendButton.addClass('disabled');
        });
        
        btc.on("change", function() {
            verifyNumber(me.$(this), me.$(this).val());
        });
        
        function verifyNumber(context, ch)
        {
            if (isNumber(ch)) {
                context.val(ch);
            }
            else {
                context.val(ch.slice(0, -1));
            }
        }
        
        function isNumber(param)
        {
            if (param == 0)
                return true;
            return (param / param) ? true : false;
        }

        function regCheck(param) {
            if (param.match(/(^\d{1,7}$)|(^\d{1,7}\.\d{0,3}$)/g))
                return true;
            else
                return false;
        }

        function regBtcCheck(param) {
            if (param.match(/(^\d{1,3}$)|(^\d{1,7}\.\d{0,6}$)/g))
                return true;
            else
                return false;
        }
    },

    actions: {
    
      submitConfirm() {
          let howToBuy = this.$('#usdInput').val();
          this.get('onConfirm')(howToBuy);
      }
    }
    
})